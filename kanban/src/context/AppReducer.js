Array.prototype.insert = function (index) {
  this.splice.apply(
    this,
    [index, 0].concat(Array.prototype.slice.call(arguments, 1))
  );
  return this;
};

const rearrangeCards = (cardArray) =>
  cardArray.map((card, idx) => ({ ...card, row_index: idx }));

const rearrangeCardsSubproject = (cardArray) =>
  cardArray.map((card, idx) => ({ ...card, row_index: idx }));

const rearrangeColumns = (columnArray) =>
  columnArray.map((column, idx) => ({ ...column, board_index: idx }));

const rearrangeSuprojects = (subprojectArray) =>
  subprojectArray.map((subproject, idx) => ({ ...subproject, row_index: idx }));

Array.prototype.rearrangeCards = function () {
  return rearrangeCards(this);
};
Array.prototype.rearrangeCardsSubproject = function () {
  return rearrangeCardsSubproject(this);
};

Array.prototype.rearrangeColumns = function () {
  return rearrangeColumns(this);
};
Array.prototype.rearrangeSubprojects = function () {
  return rearrangeSuprojects(this);
};

export default (state, action) => {
  switch (action.type) {
    case "SET_COLUMNS":
      return {
        ...state,
        columns: action.payload,
      };
    case "SET_SUBPROJECTS":
      return {
        ...state,
        subprojects: action.payload,
      };
    case "SET_SUBCOLITEMS":
      return {
        ...state,
        subColItems: action.payload,
      };
    case "MOVE_CARD":
      return {
        ...state,
        columns: state.columns
          .map((column) =>
            column.id === action.payload.source_column_id
              ? {
                  ...column,
                  items: column.items
                    .filter((card) => card.id !== action.payload.card.id)
                    .rearrangeCards(),
                }
              : column
          )
          .map((column) =>
            column.id === action.payload.dest_column_id
              ? {
                  ...column,
                  items: column.items
                    .insert(action.payload.dest_card_index, {
                      ...action.payload.card,
                      row_index: action.payload.dest_card_index,
                    })
                    .rearrangeCards(),
                }
              : column
          ),
      };
    case "ADD_CARD_COLUMN":
      return {
        ...state,
        columns: [
          ...state.columns.map((column) =>
            column.id === action.payload.column_id
              ? {
                  ...column,
                  tasks: [
                    ...column.tasks,
                    {
                      ...action.payload.card,
                      row_index: action.payload.card.row_index,
                    },
                  ],
                }
              : column
          ),
        ],
      };
    case "ADD_CARD_SUBPROJECT":
      return {
        ...state,
        subprojects: [
          ...state.subprojects.map((subproject) =>
            subproject.id === action.payload.subproject_id
              ? {
                  ...subproject,
                  tasks: [
                    ...subproject.tasks,
                    {
                      ...action.payload.card,
                      row_index: action.payload.card.row_index,
                    },
                  ],
                }
              : subproject
          ),
        ].rearrangeCardsSubproject(),
      };
    case "ADD_COLUMN":
      return {
        ...state,
        columns: [...state.columns, action.payload.column].rearrangeColumns(),
      };
    case "ADD_SUBPROJECT":
      return {
        ...state,
        subprojects: [
          ...state.subprojects,
          action.payload.subproject,
        ].rearrangeSubprojects(),
      };
    case "REMOVE_CARD":
      return {
        ...state,
        columns: state.columns
          .map((column) =>
            column.id === action.payload.column_id
              ? {
                  ...column,
                  items: [
                    ...column.items.filter(
                      (task) => task.id !== action.payload.card.id
                    ),
                  ],
                }
              : column
          )
          .rearrangeCards(),
      };
    case "REMOVE_COLUMN":
      return {
        ...state,
        columns: [
          ...state.columns.filter(
            (column) => column.id !== action.payload.column.id
          ),
        ].rearrangeColumns(),
      };
    case "EDIT_CARD":
      return {
        ...state,
        columns: state.columns
          .map((column) =>
            column.id === action.payload.column_id
              ? {
                  ...column,
                  items: [
                    ...column.items.filter(
                      (task) => task.id !== action.payload.card.id
                    ),
                    { ...action.payload.card },
                  ],
                }
              : column
          )
          .rearrangeCards(),
      };
    case "EDIT_COLUMN":
      return {
        ...state,
        columns: [
          ...state.columns.map((column) =>
            column.id === action.payload.column.id
              ? {
                  ...column,
                  name: action.payload.column.name,
                  max_tasks: action.payload.column.max_tasks,
                }
              : column
          ),
        ].rearrangeColumns(),
      };
    case "SET_COLUMN_CARDS":
      return {
        ...state,
        columns: state.columns
          .map((column) =>
            column.id === action.payload.column_id
              ? {
                  ...column,
                  items: [
                    ...column.items,
                    { ...action.payload.card, row_index: column.items.length },
                  ],
                }
              : column
          )
          .rearrangeCards(),
      };
    case "SET_ITEMS":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.column_id
            ? action.payload.items
            : column.items
        ),
      };

    default:
      return state;
  }
};
