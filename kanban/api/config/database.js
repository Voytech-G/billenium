module.exports = {
  developmentDatabaseConnection: {
    databaseContainerName: "ds251804",
    databasePort: "51804",
    databaseName: "kanban-wojtek",
    username: "kanban-wojtek",
    password: "kinethicc69",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  productionDatabaseConnection: {
    databaseContainerName: "ds147946",
    databasePort: "47946",
    databaseName: "kanban-variant",
    username: "kanban-admin",
    password: "kinethicc69",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};
