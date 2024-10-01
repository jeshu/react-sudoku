pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh "chmod +x -R '${env.WORKSPACE}'"
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    sh 'sonar-scanner -Dsonar.projectKey=my-nodejs-project -Dsonar.sources=src -Dsonar.host.url=http://192.168.29.214:9000/ -Dsonar.login=AOECvkQnL1Mow0InaHszOdzz8oTp0ElgeFUgJl5tSIU='
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}