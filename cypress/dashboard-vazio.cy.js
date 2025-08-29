/**
 * Este é um arquivo de teste do Cypress para validar
 * a página de dashboard de seguro em seu estado vazio.
 */
describe('Validação do Dashboard de Seguro (Estado Vazio)', () => {

  // O bloco 'beforeEach' roda antes de cada teste 'it'
  beforeEach(() => {
    // 1. Visita a página correta antes de cada teste
    // Como configuramos a 'baseUrl', só precisamos da parte final do link.
    cy.visit('/my/insurance');
  });

  // Este é o nosso caso de teste principal
  it('deve validar a visibilidade, textos e os links dos diferentes planos', () => {
    
    // 2. Verifica a visibilidade dos elementos principais da tela vazia
    cy.get('[data-cy="container-principal-vazio"]').should('be.visible');
    cy.get('[data-cy="titulo-pagina-vazia"]').should('be.visible');

    // 3. Verifica se o texto principal está correto
    cy.get('[data-cy="titulo-pagina-vazia"]').should('have.text', 'Aqui vai o texto exato que você está vendo na tela');

    // --- TESTE DO PRIMEIRO PLANO ---
    
    // 4. Garante que o link do primeiro plano é visível e tem o atributo 'href'
    cy.get('[data-cy="link-plano-um"]').should('be.visible');
    cy.get('[data-cy="link-plano-um"]').should('have.attr', 'href');
    
    // 5. Clica no link e verifica se a URL mudou corretamente
    cy.get('[data-cy="link-plano-um"]').click();
    cy.url().should('include', '/caminho/do/artigo/do/plano-um'); // Troque pelo caminho real

    // 6. Volta para a página do dashboard para testar o próximo link
    cy.go('back');

    // --- TESTE DO SEGUNDO PLANO ---

    // 7. Garante que o link do segundo plano é visível e tem o atributo 'href'
    cy.get('[data-cy="link-plano-dois"]').should('be.visible');
    cy.get('[data-cy="link-plano-dois"]').should('have.attr', 'href');

    // 8. Clica no link e verifica se a URL mudou corretamente
    cy.get('[data-cy="link-plano-dois"]').click();
    cy.url().should('include', '/caminho/do/artigo/do/plano-dois'); // Troque pelo caminho real
  });
});
