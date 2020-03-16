Array.prototype.insert = function(index) {
  this.splice.apply(
    this,
    [index, 0].concat(Array.prototype.slice.call(arguments, 1))
  );
  return this;
};

const rearrangeCards = cardArray =>
  cardArray.map((card, idx) => ({ ...card, row_index: idx }));

// Use for column items only
Array.prototype.rearrangeCards = function() {
  return rearrangeCards(this);
};

export default (state, action) => {
  switch (action.type) {
    case "SET_COLUMNS":
      return {
        ...state,
        columns: action.payload
      };
    case "MOVE_CARD":
      return {
        ...state,
        columns: state.columns
          .map(column =>
            column.id === action.payload.source_column_id
              ? {
                  ...column,
                  items: column.items
                    .filter(card => card.id !== action.payload.card.id)
                    .rearrangeCards()
                }
              : column
          )
          .map(column =>
            column.id === action.payload.dest_column_id
              ? {
                  ...column,
                  items: column.items
                    .insert(action.payload.dest_card_index, {
                      ...action.payload.card,
                      row_index: action.payload.dest_card_index
                    })
                    .rearrangeCards()
                }
              : column
          )
      };
    case "ADD_CARD":
      return {
        ...state,
        columns: state.columns
          .map(column =>
            column.id === action.payload.column_id
              ? {
                  ...column,
                  items: [
                    ...column.items,
                    { ...action.payload.card, row_index: column.items.length }
                  ]
                }
              : column
          )
          .rearrangeCards()
      };
    case "REMOVE_CARD":
      return {
        ...state,
        columns: state.columns
          .map(column => {
            return column.id === action.payload.column_id
              ? {
                  ...column,
                  items: [
                    ...column.items.filter(
                      note => note.id !== action.payload.card.id
                    )
                  ]
                }
              : column;
          })
          .rearrangeCards()
      };
    case "SET_COLUMN_CARDS":
      return {
        ...state,
        columns: state.columns
          .map(column =>
            column.id === action.payload.column_id
              ? {
                  ...column,
                  items: [
                    ...column.items,
                    { ...action.payload.card, row_index: column.items.length }
                  ]
                }
              : column
          )
          .rearrangeCards()
      };
    case "SET_ITEMS":
      return {
        ...state,
        columns: state.columns.map(column =>
          column.id === action.payload.column_id
            ? action.payload.items
            : column.items
        )
      };
    default:
      return state;
  }
};
