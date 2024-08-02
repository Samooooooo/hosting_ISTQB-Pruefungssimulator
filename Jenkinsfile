pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Samooooooo/hosting_ISTQB-Pruefungssimulator.git'
            }
        }
        stage('Build') {
            steps {
                script {
                    docker.image('node:20').inside {
                        sh 'npm install'
                        sh 'npm run build --prod'
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t osama0thabit/angular-app:latest .'
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        sh 'docker push osama0thabit/angular-app:latest'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker stop $(docker ps -aq) || true'
                    sh 'docker rm $(docker ps -aq) || true'
                    sh 'docker run -d -p 80:80 osama0thabit/angular-app:latest'
                }
            }
        }
    }
}
