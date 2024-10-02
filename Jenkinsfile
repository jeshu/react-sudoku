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
              script {
                  scannerHome = tool 'SonarQube-install'// must match the name of an actual scanner installation directory on your Jenkins build agent
              }
              withSonarQubeEnv('SonarQubeScanner') {// If you have configured more than one global server connection, you can specify its name as configured in Jenkins
                sh 'echo $PATH'
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