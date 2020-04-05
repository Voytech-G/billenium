const ColumnRepository = require("../database/repository/ColumnRepository");
const TaskRepository = require("../database/repository/TaskRepository");
const ProjectService = require("../service/ProjectService");

class ColumnService {
  /**
   * Create column
   *
   * @param {Object} payload
   * @return {Object}
   */
  static async createColumn(payload) {
    const projectId = payload.project_id;
    const name = payload.name;
    const boardIndex = payload.board_index;
    const maxTasks = payload.max_tasks;
    const userName = payload.user;
    const rowIndex = payload.row_index;
    // get column ID to add reference to it to target project
    const column = await ColumnRepository.create(
      projectId,
      name,
      boardIndex,
      maxTasks,
      userName,
      rowIndex
    );

    const columnId = column.id;
    await ProjectService.assignColumnToProject(columnId, projectId);

    return column;
  }

  /**
   * Update column
   *
   * @param {Object} payload
   * @return {Object}
   */
  static async updateColumn(payload) {
    const columnId = payload.column_id;
    const name = payload.name;
    const boardIndex = payload.board_index;
    const maxTasks = payload.max_tasks;

    const filter = {
      _id: columnId,
    };

    const update = {
      name: name,
      board_index: boardIndex,
      max_tasks: maxTasks,
    };

    return await ColumnRepository.findOneByFilterAndUpdate(filter, update);
  }

  /**
   * Find the target column for task and assign the task to it
   *
   * @param {string} columnId
   * @param {Object} taskId
   * @return {void}
   */
  static async assignTaskToColumn(columnId, taskId) {
    const targetColumn = await ColumnRepository.findById(columnId);

    if (targetColumn == null) {
      throw new Error("Found no column to assign the task to");
    }

    // find the task we want to assign to column
    const targetTask = await TaskRepository.findById(taskId);

    if (targetTask == null) {
      throw new Error("Found no task to assign to the column");
    }

    // add task to target column tasks collection
    targetColumn.tasks.push(targetTask);

    await targetColumn.save();

    return;
  }

  /**
   * Find target column and remove the task from it
   *
   * @param {string} taskId
   * @return {void}
   */
  static async unassignTaskFromColumn(columnId, taskId) {
    const column = await ColumnRepository.findById(columnId);

    column.tasks.pull(taskId);

    await column.save();
  }

  /**
   * Remove one column by ID
   *
   * @param {Object} payload
   * @return {Object} // data about the removed column
   */
  static async removeColumn(payload) {
    const columnId = payload.column_id;

    const column = await ColumnRepository.findByIdAndRemove(columnId);

    if (column == null) {
      throw new Error("Found no column of given ID to remove.");
    }

    const projectId = column.project;
    await ProjectService.unassignColumnFromProject(columnId, projectId);

    // move all columns on the right from removed column to the left so the gap is filled
    const boardIndex = column.board_index;
    await this.moveNextColumnsLeft(boardIndex);

    return column;
  }

  /**
   * Move all columns to the right of given board index to the left
   *
   * @param {Number} boardIndex
   * @return {void}
   */
  static async moveNextColumnsLeft(boardIndex) {
    const update = {
      $inc: { board_index: -1 },
    };

    await this.changeColumnsBoardIndexes(update, boardIndex);

    return;
  }

  /**
   * Change all columns board indexes to the right of the given board index with given filter
   *
   * @param {Object} update
   * @param {Number} boardIndex
   * @param {Boolean} including
   * @return {void}
   */
  static async changeColumnsBoardIndexes(
    update,
    boardIndex,
    including = false
  ) {
    const filter = {
      board_index:
        including === true ? { $gte: boardIndex } : { $gt: boardIndex },
    };

    await ColumnRepository.findManyByFilterAndUpdate(filter, update);

    return;
  }

  /**
   * Get one column data
   *
   * @param {Object} payload
   * @return {Object}
   */
  static async getOne(payload) {
    const columnId = payload.column_id;

    const populateConfig = [
      {
        path: "tasks",
        model: "Task",
        // populate: {
        //     path: 'subtasks',
        //     model: 'Subtask',
        // },
      },
    ];

    return await ColumnRepository.findByIdAndPopulate(columnId, populateConfig);
  }
}

module.exports = ColumnService;
