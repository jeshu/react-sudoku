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
            steps {
              def scannerHome = tool 'SonarScanner';
              withSonarQubeEnv('SonarScanner') {
                sh "${scannerHome}/bin/sonar-scanner"
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