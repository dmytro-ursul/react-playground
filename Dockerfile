# Use the official Ruby base image
FROM ruby:3.2.2
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/yarn-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/yarn-archive-keyring.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y nodejs yarn

WORKDIR /app

# Copy Gemfile and Gemfile.lock into the working directory
COPY Gemfile Gemfile.lock ./

# Install gems
RUN gem install bundler && bundle install

# Copy package.json and yarn.lock into the working directory
COPY package.json yarn.lock ./

# Install yarn packages
RUN yarn install

# Copy the rest of the application code
COPY . .

RUN rails db:create
RUN rails db:migrate
RUN rails db:seed

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Expose the ports for the services
EXPOSE 3050

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3050

# Start the services
CMD ["sh", "-c", "yarn start && rails server -b 0.0.0.0 -p 3051"]
