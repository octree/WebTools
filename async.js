/**
 * 
 * 替代 Promise， 我不喜欢 Promise，这不是 MinggePromise
 * 
 * @license MIT
 * @author Octree <fouljz@gmail.com>
 */

export class Async {

    constructor(trunck) {
        this.trunck = trunck
    }

    static unit(obj) {

        return new Async(callback => {
            callback(obj, null)
        })
    }

    excute(callback) {
        this.trunck(callback)
    }

    fmap(transform) {
        return new Async(callback => {
            this.excute((obj, err) => {
                if (err == null) {
                    callback(transform(obj), null)
                } else {
                    callback(null, err)
                }
            })
        })
    }

    bind(transform) {
        return new Async(callback => {
            this.excute((obj, err) => {
                if (err == null) {
                    transform(obj).excute(callback)
                } else {
                    callback(null, err)
                }
            })
        })
    }

}

//  { unit, Async };

(new Async(callback => {
    callback('hello world', null)
})).bind(str => {
    return Async.unit(str + ' !')
}).fmap(str => {
    return 'Octree, ' + str
}).excute((obj, err) => {
    console.log(obj)
})