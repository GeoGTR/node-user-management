//make a pipeline
pipeline {
    agent any
    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/GeoGTR/node-user-management.git'
            }
        }
        stage('SonarQube analysis') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm install'
                    withSonarQubeEnv('sonar') {
                        sh 'npm install sonarqube-scanner'
                        sh 'npm run sonar'
                    }
                }
            }
        }
        stage('Build Image and Push to Registry') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'geogtr') {
                        sh "docker build -t geogtr/devopspractice:${BUILD_ID} -f Dockerfile-app ."
                        sh "docker build -t geogtr/mysql:${BUILD_ID} -f Dockerfile-mysql ."
                        sh "docker push geogtr/devopspractice:${BUILD_ID}"
                        sh "docker push geogtr/mysql:${BUILD_ID}"
                    }
                }
            }
        }
        stage('Nodejs Image Scan') {
            steps {
                grypeScan autoInstall: false, repName: "grypeAppImageReport_${JOB_NAME}_${BUILD_NUMBER}.txt", scanDest: "docker:geogtr/devopspractice:${BUILD_ID}"
            }
        }
        stage('Mysql Image Scan') {
            steps {
                grypeScan autoInstall: false, repName: "grypeMysqlImageReport_${JOB_NAME}_${BUILD_NUMBER}.txt", scanDest: "docker:geogtr/mysql:${BUILD_ID}"
            }
        }
        stage('Deploy to Test Cluster') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Test app in test cluster') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Deploy to Prod Cluster') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}