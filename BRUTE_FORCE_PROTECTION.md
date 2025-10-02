# Brute Force Protection

## Overview

The application implements a robust brute force protection system to prevent unauthorized access through password guessing attacks.

## How It Works

### Lockout Policy

- **Attempts Threshold**: 5 failed login attempts
- **Initial Lockout**: 10 minutes after first 5 failed attempts
- **Exponential Backoff**: Each subsequent set of 5 failed attempts doubles the lockout time
- **Maximum Lockout**: 5 hours (300 minutes)

### Lockout Duration Progression

| Failed Attempts | Lockout Duration |
|----------------|------------------|
| 5              | 10 minutes       |
| 10             | 20 minutes       |
| 15             | 40 minutes       |
| 20             | 80 minutes       |
| 25             | 160 minutes      |
| 30+            | 300 minutes (5 hours max) |

### User Experience

1. **First 3 Failed Attempts**: Generic error message
   - "Invalid username or password"

2. **Last 2 Attempts Before Lockout**: Warning message
   - "Invalid username or password. 2 attempts remaining before account lockout."
   - "Invalid username or password. 1 attempt remaining before account lockout."

3. **Account Locked**: Clear lockout message with time remaining
   - "Account is locked. Please try again in 10 minutes."
   - "Account is locked. Please try again in 2 hours."

4. **Successful Login**: Resets all failed attempts and unlocks account

## Implementation Details

### Database Fields

Added to `users` table:
- `failed_attempts` (integer, default: 0) - Tracks number of failed login attempts
- `locked_until` (datetime, nullable) - Timestamp when account will be unlocked

### Backend (Rails)

#### User Model (`app/models/user.rb`)

**Constants:**
```ruby
ATTEMPTS_PER_LOCKOUT = 5
BASE_LOCKOUT_MINUTES = 10
MAX_LOCKOUT_MINUTES = 300 # 5 hours
```

**Key Methods:**
- `locked?` - Check if account is currently locked
- `lockout_time_remaining` - Get remaining lockout time in seconds
- `record_failed_attempt!` - Increment failed attempts and lock if threshold reached
- `lock_account!` - Lock account with exponential backoff calculation
- `reset_failed_attempts!` - Reset counter after successful login
- `lockout_message` - Generate user-friendly lockout message

#### Login Mutation (`app/graphql/mutations/login.rb`)

**Flow:**
1. Find user by username
2. Check if account is locked → Return lockout message
3. Attempt authentication
4. **Success**: Reset failed attempts, return token
5. **Failure**: 
   - Record failed attempt
   - Check if now locked → Return lockout message
   - Calculate remaining attempts
   - Return appropriate error message

### Frontend (React)

#### Login Component (`src/components/Login.tsx`)

**Error Handling:**
- Detects lockout messages and displays them prominently
- Preserves attempt warning messages
- Shows time remaining for locked accounts
- Different error styling for different error types

## Security Features

### Protection Against:

1. **Brute Force Attacks**: Exponential backoff makes automated attacks impractical
2. **Username Enumeration**: Generic error messages don't reveal if username exists
3. **Timing Attacks**: Consistent response times regardless of username validity

### Best Practices Implemented:

- ✅ Account lockout with exponential backoff
- ✅ Maximum lockout duration cap (5 hours)
- ✅ Automatic unlock after time expires
- ✅ Failed attempt counter reset on successful login
- ✅ User-friendly error messages with warnings
- ✅ No username enumeration
- ✅ Secure password storage (BCrypt)
- ✅ Strong password requirements

## Testing the Feature

### Test Scenario 1: Basic Lockout

1. Try to login with wrong password 5 times
2. Account should be locked for 10 minutes
3. Try to login again → See lockout message
4. Wait 10 minutes or reset in Rails console
5. Login successfully → Failed attempts reset

### Test Scenario 2: Exponential Backoff

1. Fail 5 times → Locked for 10 minutes
2. Wait 10 minutes
3. Fail 5 more times → Locked for 20 minutes
4. Wait 20 minutes
5. Fail 5 more times → Locked for 40 minutes

### Test Scenario 3: Successful Login Reset

1. Fail 3 times
2. Login successfully
3. Failed attempts counter should be reset to 0

### Manual Testing Commands

```bash
# Rails console
rails console

# Check user lockout status
user = User.find_by(username: 'john.doe')
user.locked?
user.failed_attempts
user.lockout_time_remaining

# Manually lock account (for testing)
user.update!(failed_attempts: 5, locked_until: 10.minutes.from_now)

# Manually unlock account
user.reset_failed_attempts!

# Simulate failed attempts
5.times { user.record_failed_attempt! }
```

## Migration

```bash
# Run migration to add lockout fields
rails db:migrate

# Rollback if needed
rails db:rollback
```

## Configuration

To modify lockout behavior, update constants in `app/models/user.rb`:

```ruby
ATTEMPTS_PER_LOCKOUT = 5      # Change threshold
BASE_LOCKOUT_MINUTES = 10     # Change initial lockout duration
MAX_LOCKOUT_MINUTES = 300     # Change maximum lockout duration
```

## Monitoring

### Recommended Monitoring:

1. **Track lockout events** - Log when accounts are locked
2. **Alert on multiple lockouts** - Detect potential attacks
3. **Monitor failed attempts** - Identify patterns
4. **Track lockout duration** - Ensure users aren't locked too long

### Future Enhancements:

- [ ] Email notification on account lockout
- [ ] Admin dashboard to view locked accounts
- [ ] IP-based rate limiting
- [ ] CAPTCHA after multiple failed attempts
- [ ] Two-factor authentication (2FA)
- [ ] Account unlock via email verification
- [ ] Logging of all authentication events

## Security Considerations

1. **Don't reveal lockout status before authentication attempt**
   - Only show lockout message after user tries to login
   
2. **Consistent error messages**
   - Don't reveal if username exists or not
   
3. **Time-based unlocking**
   - Accounts automatically unlock after duration expires
   
4. **No manual unlock by user**
   - Prevents attackers from bypassing protection
   
5. **Database-level defaults**
   - `failed_attempts` defaults to 0 for new users

## Compliance

This implementation helps meet security requirements for:
- OWASP Top 10 (A07:2021 - Identification and Authentication Failures)
- PCI DSS Requirement 8.1.6 (Limit repeated access attempts)
- NIST 800-63B (Account lockout mechanisms)

## Support

If a legitimate user is locked out:
1. Wait for the lockout duration to expire
2. Contact administrator to manually reset (via Rails console)
3. Future: Implement email-based unlock mechanism

