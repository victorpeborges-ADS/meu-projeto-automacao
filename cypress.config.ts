import { defineConfig } from 'cypress';
import * as fs from 'fs';

// Usaremos o 'dotenv' para carregar variáveis de ambiente (como senhas ou URLs)
// de um arquivo .env, para não deixá-las no código.
require('dotenv').config();

export default defineConfig({
  // --- Configurações Gerais ---
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false, // Permite testes que navegam entre diferentes domínios
  video: false, // Desabilitamos vídeos para execuções mais rápidas. Podemos habilitar para depuração.
  trashAssetsBeforeRuns: true, // Limpa screenshots e vídeos de execuções antigas

  // --- Otimizações de Performance (para suítes de testes grandes) ---
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 20,

  // --- Configuração dos Relatórios ---
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/results/junit-results-[hash].xml',
    },
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Relatório de Testes E2E - Projeto Stride Health',
      reportDir: 'cypress/report',
      overwrite: false,
      embeddedScreenshots: true,
      html: true, // Geraremos o relatório em HTML diretamente
      json: true,
    },
  },

  e2e: {
    // TODO: Ajustaremos esta URL para a do ambiente de desenvolvimento correto.
    baseUrl: 'https://dev-www.stridehealth.com',
    
    // Onde o Cypress vai procurar pelos arquivos de teste
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // --- Configuração dos Eventos Node.js (Onde a mágica acontece) ---
    setupNodeEvents(on, config) {
      // Configura os timeouts para serem mais longos, tornando os testes mais estáveis
      config.defaultCommandTimeout = 25000;
      config.requestTimeout = 25000;

      // Habilita o plugin de tags (@cypress/grep)
      require('@cypress/grep/src/plugin')(config);
      // Habilita o plugin de relatórios (mochawesome)
      require('cypress-mochawesome-reporter/plugin')(on);

      // --- Tarefas Customizadas ---
      // Aqui registramos funções que o Cypress pode executar fora do navegador
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        // Tarefa para ler o conteúdo da pasta de downloads
        downloads: (downloadsPath) => {
          return fs.readdirSync(downloadsPath);
        },
        // Placeholder para a tarefa de ler PDF. Vamos criar a função para isso depois.
        readPdf(pathToPdf) {
          // TODO: Implementar a lógica de leitura do PDF aqui
          console.log(`Ainda não implementamos a leitura de PDF em: ${pathToPdf}`);
          return null;
        },
      });

      // Carrega as variáveis de ambiente do seu sistema para o Cypress
      config.env = { ...process.env, ...config.env };
      config.env.grepOmitFiltered = true;
      
      return config;
    },
  },
});