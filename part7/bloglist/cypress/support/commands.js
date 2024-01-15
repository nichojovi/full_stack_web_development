Cypress.Commands.add("login", ({ username, password }) => {
  const backendUrl = Cypress.env("BACKEND");

  cy.request("POST", `${backendUrl}/login`, { username, password })
    .then(({ body }) => {
      localStorage.setItem("loggedBlogUser", JSON.stringify(body));
    })
    .then(() => {
      cy.visit("/");
    });
});

Cypress.Commands.add("addBlog", ({ title, author, url }) => {
  const backendUrl = Cypress.env("BACKEND");
  const userToken = JSON.parse(localStorage.getItem("loggedBlogUser")).token;

  cy.request({
    method: "POST",
    url: `${backendUrl}/blogs`,
    body: { title, author, url },
    headers: { Authorization: `Bearer ${userToken}` },
  }).then(() => {
    cy.visit("/");
  });
});
