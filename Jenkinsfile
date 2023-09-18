//make a pipeline
pipeline {
    agent any
    stages {
        stage('Code Scan') {
            steps {
                echo 'Building..'
            }
        }
        stage('Build Image and Push to Registry') {
            steps {
                echo "------Docker login--------"
                echo Ankasoft1! | sudo -S echo "build and push process starting"
                sudo docker login -u "geogtr" -p "Registry123." docker.io
                echo "------Docker build------"
                sudo docker build -t geogtr/devopspractice:${BUILD_ID} -f Dockerfile-app .
                sudo docker build -t geogtr/mysql:${BUILD_ID} -f Dockerfile-mysql .
                echo "------Docker push------"
                sudo docker push geogtr/devopspractice:${BUILD_ID}
                sudo docker push geogtr/mysql:${BUILD_ID}
            }
        }
        stage('Image Scan') {
            steps {
                echo "------Image Scanning with Grype--------"
                grypeScan scanDest: "docker:geogtr/devopspractice:${BUILD_ID}", repName: testtesttest.txt
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