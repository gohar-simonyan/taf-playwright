pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }
    environment {
        API_BASE_URL = credentials('API_BASE_URL')
        API_TOKEN = credentials('API_TOKEN')
        PROJECT_NAME = credentials('PROJECT_NAME')
        BASE_URL = credentials('BASE_URL')
        USER_NAME_0 = credentials('USER_NAME_0')
        PASSWORD_0 = credentials('PASSWORD_0')
        BASE_USER_0 = credentials('BASE_USER_0')
        USER_NAME_1 = credentials('USER_NAME_1')
        PASSWORD_1 = credentials('PASSWORD_1')
        BASE_USER_1 = credentials('BASE_USER_1')
    }

    options {
        skipStagesAfterUnstable()
        timeout(time: 30, unit: 'MINUTES')
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Test Matrix') {
            matrix {
                axes {
                    axis {
                        name 'TEST_SUITE'
                        values 'ui-tests', 'api-tests'
                    }
                }
                stages {
                    stage('Navigate Suite Directory & Install Dependencies') {
                        steps {
                            dir("${env.TEST_SUITE}") {
                                sh '''
                                if [ -f package.json ]; then
                                    echo "Installing dependencies for ${env.TEST_SUITE}"
                                    npm install
                                if [ "${env.TEST_SUITE}" == "ui-tests" ]; then
                                    npx playwright install --with-deps
                                fi
                                else
                                    echo "package.json not found in ${env.TEST_SUITE} directory!"
                                    exit 1
                                fi
                                '''
                            }
                        }
                    }
                    stage('Run Tests') {
                        steps {
                            dir("${env.TEST_SUITE}") {
                                sh '''
                                if [ "${env.TEST_SUITE}" == "ui-tests" ]; then
                                    npx playwright test
                                elif [ "${env.TEST_SUITE}" == "api-tests" ]; then
                                    npx mocha tests/*.test.js
                                else
                                    echo "Unknown test suite: ${env.TEST_SUITE}"
                                    exit 1
                                fi
                                '''
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/test-results/*.xml', allowEmptyArchive: true
        }
        success {
            echo 'Build and Tests completed successfully'
        }
        failure {
            echo 'Build or Tests failed'
        }
    }
}
