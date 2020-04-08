module.exports = {
  developmentDatabaseConnection: {
    databaseContainerName: "ds239097",
    databasePort: "39097",
    databaseName: "kanban-ola",
    username: "kanban-ola",
    password: "kinethicc69",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  productionDatabaseConnection: {
    databaseContainerName: "ds147946",
    databasePort: "47946",
    databaseName: "kanban-variant",
    username: "kanban-admin",
    password: "kinethicc69",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
