pipeline {
  agent any
  environment {
    PGPASSWORD = credentials('pgpassword')
    JWT_SECRET = 'anonymous_mouse'
    TEST_PORT = '5200'
    TEST_DB_USERNAME = 'postgres'
    TEST_DB_PASSWORD = 'password'
    TEST_DB_HOST = 'localhost'
    TEST_DB_NAME = 'boardtestdb'
    TEST_DB_PORT = '5432'
    COVERALLS_REPO_TOKEN = credentials('jobber_token')
    GIT_URI = credentials('jobber_git_url')
  }
  stages {
    stage('Clone Repository') {
      steps {
        git "${GIT_URI}"
      }
    }
    stage('Create Database') {
      steps {
        bat 'psql -h 127.0.0.1 -p 5432 -c "DROP DATABASE IF EXISTS boardtestdb;" -U postgres'
        bat 'psql -h 127.0.0.1 -p 5432 -c "CREATE DATABASE boardtestdb;" -U postgres'
      }
    }
    stage('Install Dependencies') {
      steps {
        bat "npm install"
      }
    }
    stage('Run Tests') {
      steps {
        bat "npm run test:local"
      }
    }
    stage('Run Coverage Analytics') {
      steps {
        bat "npm run coverage"
      }
    }
  }
}