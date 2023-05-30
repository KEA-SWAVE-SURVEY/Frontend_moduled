pipeline {
    agent any
    tools {nodejs "WS"}
    environment {
        TARGET_HOST = "root@172.16.210.22"
    }
    
    stages() {
        stage('git clone') {
            steps() {
                git branch: 'main', credentialsId: 'git-kjk7212', url: 'https://github.com/KEA-SWAVE-SURVEY/Front-end/'
            }
        }
        
        stage('build') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        
        stage('build & push docker image') {
            steps {
                script{
                    image = docker.build("kjk7212/front")
                    docker.withRegistry('https://registry.hub.docker.com/repository/docker/kjk7212/front/', 'docker-hub-credentials') {
                        image.push()
                    }
                }
            }
        }
        stage('ws deployment') {
            steps{
                sshagent(['WS']) {
                sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST} 'docker stop front'"
                sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST} 'docker rm front'"
                sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST} 'docker rmi kjk7212/front'"
                sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST} 'docker pull kjk7212/front'"
                sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST} 'docker run --name front -d -p 3000:3000 kjk7212/front'"
                }
            }
        }
    }
}
