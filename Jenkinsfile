pipeline {
  agent any
  environment {
    JWT_SECRET = 'anonymous_mouse'
    TEST_PORT = '5200'
    TEST_DB_USERNAME = 'postgres'
    TEST_DB_PASSWORD = 'password'
    TEST_DB_HOST = 'localhost'
    TEST_DB_NAME = 'boardtestdb'
    TEST_DB_PORT = '5432'
    COVERALLS_REPO_TOKEN = credentials('coveralls_repo_token')
  }
  stages {
    stage('Clone Repository') {
      steps {
        git "${GIT_URI}"
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