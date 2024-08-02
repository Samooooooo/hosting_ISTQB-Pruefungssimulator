pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'osama0thabit/angular-app:latest'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    deleteDir()
                }
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    docker.image('node:20').inside {
                        // Ensure all npm-related directories have the correct permissions
                        sh 'sudo chown -R 110:114 /var/lib/jenkins/workspace/istqb-pipeline'
                        sh 'sudo chown -R 110:114 /.npm'
                        // Clean node_modules before installation
                        sh 'rm -rf node_modules'
                        sh 'npm install'
                        sh 'npm run build --prod'
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}", ".")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}").run('-p 80:80')
                }
            }
        }
    }
}
