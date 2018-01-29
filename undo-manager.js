
/**
 *
 * Undo Redo Manager
 *
 * @license MIT
 * @author Octree <fouljz@gmail.com>
 */

export class UndoManager {
    /**
     * 构造器
     *
     * limitation：缓存限制，超出限制会抛弃掉较早的记录
     */
    constructor(limitation) {

      this.pos = 0
      this.limitation = limitation
      // [{undo:function, redo: function}]
      this.actions = []
    }

    // action 会立即执行， 并注册 undo 用来取消当前操作，redo 操作会重新执行 action
    perform(action, undo) {

      let count = this.actions.length - this.pos

      for (var i = 0; i < count; i++) {
        this.actions.pop()
      }

      count = this.actions.length - this.limitation - 1

      for (var i = 0; i < count; i++) {
        this.actions.shift()
      }

      this.actions.push({ redo: action, undo: undo })
      action()
      this.pos = this.actions.length
    }
    // 回到上一步，取消操作
    undo() {

      if (this.canUndo()) {
        this.pos -= 1
        let action = this.actions[this.pos]
        action.undo()
      }
    }
// redo
    redo() {
      if (this.canRedo()) {
        let action = this.actions[this.pos]
        action.redo()
        this.pos += 1
      }
    }

    canUndo() {
      return this.pos > 0
    }

    canRedo() {
      return this.pos < this.actions.length
    }

}
