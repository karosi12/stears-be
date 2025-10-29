pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        GIT_BRANCH = 'main'
    }

    stages {
        stage('Init') {
            steps {
                script {
                    sh '''
                     echo "Starting build for stears backend service..."
                    '''
                }
            }
        }
        stage('Clone Repo') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-pat',
                    usernameVariable: 'GIT_USERNAME',
                    passwordVariable: 'GIT_PASSWORD'
                )]) {
                    script {
                        sh '''
                        rm -rf stears-devops
                        git clone --branch $GIT_BRANCH https://$GIT_USERNAME:$GIT_PASSWORD@github.com/karosi12/stears-be.git
                        cd stears-be
                        '''
                    }
                }
            }
        }

        stage('hello') {
            steps {
                dir('stears-devops/be') {
                    sh 'echo "hello"'
                }
            }
        }
    }
}
