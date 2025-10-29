pipeline {
    agent any

    environment {
        GIT_BRANCH = 'main'
    }

    stages {
        stage('Init') {
            steps {
                script {
                    sh '''
                     echo "Start building docker image for stears backend service..."
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

        stage('Format Codebase') {
            steps {
                dir('stears-devops/be') {
                    sh '''
                        npm run format
                        echo "Format completed successfully."
                    '''
                }
            }
        }

        stage('Lint Codebase') {
            steps {
                dir('stears-devops/be') {
                    sh '''
                        npm run lint
                        echo "Linting completed successfully."
                    '''
                }
            }
        }

        stage('Integration test') {
            steps {
                dir('stears-devops/be') {
                    sh '''
                        npm run test:integration
                        echo "Integration test completed successfully."
                    '''
                }
            }
        }

        stage('Unit test') {
            steps {
                dir('stears-devops/be') {
                    sh '''
                        npm run test:unit
                        echo "Unit test completed successfully."
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('stears-devops/be') {
                    sh '''
                        docker build -t crud:latest .
                        echo "Docker image built successfully: crud:latest"
                    '''
                }
            }
        }

        stage('Security Scan - Trivy') {
            steps {
                sh '''
                    echo "Running Trivy vulnerability scan..."
                    trivy image --exit-code 1 --severity HIGH,CRITICAL crud:latest
                '''
            }
        }

        stage('Push Docker Image to GHCR') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh '''
                    export COMMIT_SHA=$(git rev-parse --short HEAD)
                    docker tag crud:latest ghcr.io/karosi12/stears-be:${COMMIT_SHA}
                    echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u karosi12 --password-stdin
                    docker push ghcr.io/karosi12/stears-be:${COMMIT_SHA}
                    docker logout ghcr.io
                    echo "Docker image pushed: ghcr.io/karosi12/stears-be:${COMMIT_SHA}"
                '''
            }
        }
    }
}
