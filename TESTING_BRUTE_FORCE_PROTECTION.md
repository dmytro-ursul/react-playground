# Testing Brute Force Protection

## Quick Test Guide

### Prerequisites
- Rails server running on `http://localhost:3000`
- React app running on `http://localhost:3001`
- User account: `john.doe` / `Password123!`

## Test 1: Basic Lockout (5 Failed Attempts)

### Steps:
1. Go to `http://localhost:3001`
2. Enter username: `john.doe`
3. Enter wrong password: `wrongpassword`
4. Click "Sign In"
5. Repeat steps 3-4 **five times total**

### Expected Results:

**Attempts 1-3:**
```
❌ Invalid username or password
```

**Attempt 4:**
```
⚠️ Invalid username or password. 2 attempts remaining before account lockout.
```

**Attempt 5:**
```
⚠️ Invalid username or password. 1 attempt remaining before account lockout.
```

**Attempt 6 (after 5 failures):**
```
🔒 Account is locked. Please try again in 10 minutes.
```

---

## Test 2: Exponential Backoff

### Steps:
1. Fail 5 times → Locked for 10 minutes
2. Wait 10 minutes (or unlock manually)
3. Fail 5 more times → Locked for 20 minutes
4. Wait 20 minutes (or unlock manually)
5. Fail 5 more times → Locked for 40 minutes

### Manual Unlock (for testing):
```bash
rails console

user = User.find_by(username: 'john.doe')
user.reset_failed_attempts!
exit
```

### Expected Lockout Progression:
- 5 failures → 10 minutes
- 10 failures → 20 minutes
- 15 failures → 40 minutes
- 20 failures → 80 minutes
- 25 failures → 160 minutes
- 30+ failures → 300 minutes (max)

---

## Test 3: Successful Login Resets Counter

### Steps:
1. Fail 3 times with wrong password
2. Login successfully with correct password: `Password123!`
3. Check failed attempts counter

### Verify in Rails Console:
```bash
rails console

user = User.find_by(username: 'john.doe')
user.failed_attempts  # Should be 0
user.locked?          # Should be false
exit
```

### Expected Result:
- ✅ Login successful
- ✅ Failed attempts reset to 0
- ✅ Account unlocked

---

## Test 4: Time-Based Auto-Unlock

### Steps:
1. Fail 5 times to lock account for 10 minutes
2. Wait exactly 10 minutes
3. Try to login with correct password

### Expected Result:
- ✅ Login successful (account auto-unlocked)
- ✅ Failed attempts reset to 0

---

## Test 5: Lockout Message Updates

### Steps:
1. Lock account for 10 minutes
2. Try to login immediately
3. Wait 5 minutes
4. Try to login again
5. Wait another 5 minutes
6. Try to login again

### Expected Messages:
- **Immediately**: "Account is locked. Please try again in 10 minutes."
- **After 5 min**: "Account is locked. Please try again in 5 minutes."
- **After 10 min**: Login successful (unlocked)

---

## Rails Console Commands

### Check Account Status
```ruby
user = User.find_by(username: 'john.doe')

# Check if locked
user.locked?

# Check failed attempts
user.failed_attempts

# Check lockout time remaining (in seconds)
user.lockout_time_remaining

# Get lockout message
user.lockout_message
```

### Manually Lock Account
```ruby
user = User.find_by(username: 'john.doe')

# Lock for 10 minutes (5 failed attempts)
user.update!(failed_attempts: 5, locked_until: 10.minutes.from_now)

# Lock for 20 minutes (10 failed attempts)
user.update!(failed_attempts: 10, locked_until: 20.minutes.from_now)

# Lock for maximum time (5 hours)
user.update!(failed_attempts: 30, locked_until: 5.hours.from_now)
```

### Manually Unlock Account
```ruby
user = User.find_by(username: 'john.doe')
user.reset_failed_attempts!
```

### Simulate Failed Attempts
```ruby
user = User.find_by(username: 'john.doe')

# Record 5 failed attempts
5.times { user.record_failed_attempt! }

# Check status
user.locked?  # Should be true
user.lockout_message
```

---

## Backend Logs to Watch

In the terminal running `tail -f log/development.log`, you should see:

### Successful Login:
```
User Load (0.5ms)  SELECT "users".* FROM "users" WHERE "users"."username" = $1 LIMIT $2
User Update (0.8ms)  UPDATE "users" SET "failed_attempts" = $1, "locked_until" = $2, "updated_at" = $3 WHERE "users"."id" = $4
```

### Failed Login:
```
User Load (0.5ms)  SELECT "users".* FROM "users" WHERE "users"."username" = $1 LIMIT $2
User Update (0.6ms)  UPDATE "users" SET "failed_attempts" = $1, "updated_at" = $2 WHERE "users"."id" = $3
```

### Account Locked:
```
User Load (0.5ms)  SELECT "users".* FROM "users" WHERE "users"."username" = $1 LIMIT $2
User Update (0.7ms)  UPDATE "users" SET "failed_attempts" = $1, "locked_until" = $2, "updated_at" = $3 WHERE "users"."id" = $4
```

---

## GraphQL Queries for Testing

### Test in GraphiQL (`http://localhost:3000/graphiql`)

#### Successful Login:
```graphql
mutation {
  signIn(input: {
    username: "john.doe"
    password: "Password123!"
  }) {
    token
    user {
      id
      username
      email
    }
  }
}
```

#### Failed Login:
```graphql
mutation {
  signIn(input: {
    username: "john.doe"
    password: "wrongpassword"
  }) {
    token
    user {
      id
      username
      email
    }
  }
}
```

---

## Troubleshooting

### Issue: Account stuck in locked state
**Solution:**
```bash
rails console
user = User.find_by(username: 'john.doe')
user.reset_failed_attempts!
```

### Issue: Failed attempts not incrementing
**Check:**
```bash
rails console
user = User.find_by(username: 'john.doe')
user.failed_attempts
```

### Issue: Lockout time not expiring
**Check:**
```bash
rails console
user = User.find_by(username: 'john.doe')
user.locked_until
Time.current
user.locked?
```

---

## Security Testing

### Test Username Enumeration Protection:
1. Try to login with non-existent username
2. Try to login with existing username but wrong password
3. Both should return same generic error: "Invalid username or password"

### Test Timing Attack Protection:
1. Measure response time for non-existent username
2. Measure response time for existing username with wrong password
3. Response times should be similar (BCrypt ensures this)

---

## Performance Testing

### Load Test Lockout System:
```ruby
# Rails console
require 'benchmark'

user = User.find_by(username: 'john.doe')

# Test 100 failed attempt recordings
time = Benchmark.measure do
  100.times { user.record_failed_attempt! }
end

puts "Time: #{time.real} seconds"
```

---

## Next Steps After Testing

1. ✅ Verify all test cases pass
2. ✅ Check error messages are user-friendly
3. ✅ Confirm lockout times are correct
4. ✅ Test auto-unlock after time expires
5. ✅ Verify failed attempts reset on success
6. 📝 Document any issues found
7. 🚀 Deploy to production

---

## Production Considerations

Before deploying to production:

1. **Monitoring**: Set up alerts for:
   - High number of lockouts
   - Repeated lockouts for same account
   - Lockouts across multiple accounts

2. **Logging**: Log all authentication events:
   - Failed login attempts
   - Account lockouts
   - Successful logins after lockout

3. **User Support**: Prepare support team for:
   - Locked account inquiries
   - Manual unlock procedures
   - Password reset process

4. **Email Notifications**: Consider implementing:
   - Email on account lockout
   - Email on successful login after lockout
   - Email-based unlock mechanism

