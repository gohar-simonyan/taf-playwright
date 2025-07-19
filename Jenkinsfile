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
                    stage('Install Dependencies') {
                        steps {
                            sh '''
                            npm ci --prefix ${TEST_SUITE}
                            '''
                        }
                    }

                    stage('Run Tests') {
                        steps {
                            script {
                                if (env.TEST_SUITE == "ui-tests") {
                                    sh '''
                                    npx playwright install --with-deps
                                    npx playwright test
                                    '''
                                } else if (env.TEST_SUITE == "api-tests") {
                                    sh '''
                                    npx mocha tests/**/*.test.js
                                    '''
                                }
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
