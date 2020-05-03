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
    case "SET_MENU":
      return {
        ...state,
        menuActive: action.payload,
      };
    case "SET_SUBPROJECTS":
      return {
        ...state,
        subprojects: action.payload,
      };
    case "SET_DROPPABLES":
      return {
        ...state,
        droppables: [...state.droppables, ...action.payload.droppables],
      };
    case "MOVE_CARD_COLUMN":
      return {
        ...state,
        columns: state.columns
          .map((column) =>
            column.id === action.payload.source_col_id
              ? {
                  ...column,
                  tasks: [
                    ...column.tasks
                      .filter(
                        (chosenTask) =>
                          chosenTask.subproject_id ===
                          action.payload.source_sub_id
                      )
                      .filter((task) => task.id !== action.payload.card.id)
                      .rearrangeCards(),
                    ...column.tasks.filter(
                      (task) =>
                        task.subproject_id !== action.payload.source_sub_id
                    ),
                  ],
                }
              : column
          )
          .map((columnItem) =>
            columnItem.id === action.payload.dest_col_id
              ? {
                  ...columnItem,
                  tasks: [
                    ...columnItem.tasks
                      .filter(
                        (task) =>
                          task.subproject_id === action.payload.dest_sub_id
                      )
                      .insert(action.payload.dest_card_index, {
                        ...action.payload.card,
                        subproject_id: action.payload.dest_sub_id,
                        column_id: action.payload.dest_col_id,
                        row_index: action.payload.dest_card_index,
                      })
                      .rearrangeCards(),
                    ...columnItem.tasks.filter(
                      (task) =>
                        task.subproject_id !== action.payload.dest_sub_id
                    ),
                  ],
                }
              : columnItem
          ),
      };
    case "MOVE_CARD_SUBPROJECT":
      return {
        ...state,
        subprojects: state.subprojects
          .map((subproject) =>
            subproject.id === action.payload.source_sub_id
              ? {
                  ...subproject,
                  tasks: [
                    ...subproject.tasks
                      .filter(
                        (chosenTask) =>
                          chosenTask.column_id === action.payload.source_col_id
                      )
                      .filter((task) => task.id !== action.payload.card.id)
                      .rearrangeCards(),
                    ...subproject.tasks.filter(
                      (task) => task.column_id !== action.payload.source_col_id
                    ),
                  ],
                }
              : subproject
          )
          .map((subprojectItem) =>
            subprojectItem.id === action.payload.dest_sub_id
              ? {
                  ...subprojectItem,
                  tasks: [
                    ...subprojectItem.tasks
                      .filter(
                        (task) => task.column_id === action.payload.dest_col_id
                      )
                      .insert(action.payload.dest_card_index, {
                        ...action.payload.card,
                        subproject_id: action.payload.dest_sub_id,
                        column_id: action.payload.dest_col_id,
                        row_index: action.payload.dest_card_index,
                      })
                      .rearrangeCards(),
                    ...subprojectItem.tasks.filter(
                      (task) => task.column_id !== action.payload.dest_col_id
                    ),
                  ],
                }
              : subprojectItem
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
        ],
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
    case "REMOVE_CARD_COLUMN":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.column_id
            ? {
                ...column,
                tasks: [
                  ...column.tasks
                    .filter(
                      (chosenTask) =>
                        chosenTask.subproject_id ===
                        action.payload.subproject_id
                    )
                    .filter((task) => task.id !== action.payload.card.id)
                    .rearrangeCards(),
                  ...column.tasks.filter(
                    (task) =>
                      task.subproject_id !== action.payload.subproject_id
                  ),
                ],
              }
            : column
        ),
      };
    case "REMOVE_CARD_SUBPROJECT":
      return {
        ...state,
        subprojects: state.subprojects.map((subproject) =>
          subproject.id === action.payload.subproject_id
            ? {
                ...subproject,
                tasks: [
                  ...subproject.tasks
                    .filter(
                      (chosenTask) =>
                        chosenTask.column_id === action.payload.column_id
                    )
                    .filter((task) => task.id !== action.payload.card.id)
                    .rearrangeCards(),
                  ...subproject.tasks.filter(
                    (task) => task.column_id !== action.payload.column_id
                  ),
                ],
              }
            : subproject
        ),
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
    case "EDIT_CARD_COLUMN":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.column_id
            ? {
                ...column,
                tasks: [
                  ...column.tasks.filter(
                    (task) => task.id !== action.payload.card.id
                  ),
                  { ...action.payload.card },
                ],
              }
            : column
        ),
      };
    case "EDIT_CARD_SUBPROJECT":
      return {
        ...state,
        subprojects: state.subprojects.map((subproject) =>
          subproject.id === action.payload.subproject_id
            ? {
                ...subproject,
                tasks: [
                  ...subproject.tasks.filter(
                    (task) => task.id !== action.payload.card.id
                  ),
                  { ...action.payload.card },
                ],
              }
            : subproject
        ),
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
    case "REMOVE_SUB":
      return {
        ...state,
        subprojects: [
          ...state.subprojects.filter(
            (subproject) => subproject.id !== action.payload.subId
          ),
        ].rearrangeSubprojects(),
      };
    case "EDIT_SUB":
      return {
        ...state,
        subprojects: [
          ...state.subprojects.map((subproject) =>
            subproject.id === action.payload.subId
              ? {
                  ...subproject,
                  name: action.payload.content,
                }
              : subproject
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
