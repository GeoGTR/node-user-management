//make a pipeline
pipeline {
    agent any
    
    tools {nodejs "nodejs"}
    
    
    stages {
        stage('Example test') {
             steps {
                sh 'npm test'
            }
        }
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/GeoGTR/node-user-management.git'
            }
        }
        stage('Snyk analysis') {
            steps {
                snykSecurity organisation: 'geogtr', projectName: 'node-user-management', severity: 'medium', snykInstallation: 'Snyk', snykTokenId: 'snyk-token', targetFile: 'package.json'
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
                sh "gcloud auth activate-service-account --key-file jenkins-sa.json"
                sh "gcloud container clusters get-credentials test-cluster --zone us-central1-c --project hybrid-creek-398619"
                sh 'sed -i "s/latest/${BUILD_NUMBER}/g" testdeployment.yaml'
                sh "cat testdeployment.yaml"
                sh "kubectl apply -f testdeployment.yaml"
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