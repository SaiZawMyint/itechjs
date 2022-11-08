
/**
 * Itech JS (JavaScript Library)
 * -----------------------------
 * 
 * Itech was build for your work to build faster. The features of the library were 
 * reduce memories, faster coding, small code and callback features.
 * @param {String | Element | NULL} selector 
 * @author SaiZawMyint
 * @returns assential usages Objects
 */
const itech = function (selector) {
    const selected = selectElements(selector);
    return {
        /**
         * 
         * @param {String | Date} date 
         */
        date: (date = new Date(),short = false) => {
            if(new Date(date) == 'Invalid Date') throw new Error("Invalid date")
            const idate = new IDate(date,short);
            return {
                /**
                 * Date formation
                 * 
                 * If you want to add short day you need to use 'd' or if your want to 
                 * format long day use 'dd'. Month and Year are the same.
                 * 
                 * e.g => itech().format('d,m yy')
                 * 
                 *        -> 02,10 2022
                 * 
                 * @param {String} formation - a mix of sigle character for short and tow characters for long format.
                 * @return  formatted date
                 */
                format: (formation = 'd-m-y') => {
                    return idate.formate(formation)
                },
                /**
                 * Add day to Date.
                 * @param {Number} count - Number of Day to add
                 * @returns 
                 */
                addDay: (count) => {
                    return idate.addDay(count)
                },
                /**
                 * Add month to Date
                 * @param {Number} count - Number of Month to add
                 * @returns 
                 */
                addMonth: (count) => {
                    return idate.addMonth(count)
                },
                /**
                 * Reduce day form Date.
                 * @param {Number} count - Number of Day to reduce
                 * @returns 
                 */
                reduceDay: (count) => {
                    return idate.reduceDay(count)
                },
                /**
                 * 
                 * @param {Number} count - Number of Month to reduce
                 * @returns 
                 */
                reduceMonth: (count) => {
                    return idate.reduceMonth(count)
                },
                /**
                 * Compare two date
                 * @param {Date} otrdate - Date to compare
                 * @returns An object with same, greater and smaller
                 */
                compare: (otrdate = new Date()) => {
                    return idate.compare(otrdate)
                }
            }
        },
        /**
         * Wait function
         * --
         * 
         * @param {Number} time - execution time
         * @param {Function} before - before callback function
         * @param {Function} after - after callback function
         */
        wait: (time, before, after) => {
            let id = null
            let p = 0
            clearInterval(id)
            before()
            id = setInterval(function () {
                if (p > 0) {
                    clearInterval(id)
                    after()
                }
                p++
            }, time)
        }
    }
}
/**
 * 
 * @param {Element | String} selector 
 */
const selectElements = (selector) => {
    if (!selector) return null
    if (selector instanceof Element) return selector
    if (typeof x == 'string') return document.querySelectorAll(selector)
}


class IDate{
    static SPLITOR = /[\-\/\ \,]/
    constructor(date = new Date().toDateString(),short = false){
        this.date = new Date(date)
        this.short = short
    }
    formate(fmt = 'd-m-y'){
        let result = ''
        const date = new Date(this.date)
        const nonW = cmnFns.nonWords(fmt)
        result = (cmnFns.convertDMYCases(fmt,nonW,date,this.short))
        return result
    }
    addDay(numOfDay){
        let addedDate = new Date(this.date);
        addedDate.setDate(addedDate.getDate() + numOfDay)
        return addedDate.toDateString()
    }
    addMonth(numOfMonth){
        return new Date(this.date.setMonth(this.date.getMonth() + numOfMonth)).toDateString()
    }
    reduceDay(numOfDay){
        let addedDate = new Date(this.date);
        addedDate.setDate(addedDate.getDate() - numOfDay)
        return addedDate.toDateString()
    }
    reduceMonth(numOfMonth){
        return new Date(this.date.setMonth(this.date.getMonth() - numOfMonth)).toDateString()
    }
    compare(otrDate = new Date()){
        const ndate = new Date(this.date)
        const nodate = new Date(otrDate)
        return {
            same: ndate >= nodate && ndate <= nodate,
            greater: !(ndate >= nodate && ndate <= nodate) && ndate >= nodate,
            smaller: !(ndate >= nodate && ndate <= nodate) && ndate <= nodate
        }
    }
}
const cmnFns = {
    nonWords: function(str){
        let arrStr = str.split("")
        var strRegExp = /\W/g
        let arrNonWord = []
        arrStr.forEach(function (str) {
            var result = str.match(strRegExp)
            if (result)
                arrNonWord.push(result[0])
        })
        return arrNonWord
    },
    convertDMYCases: function(dmy = 'd-m-y',splitor = ['-','-'],date = new Date(),short = false){
        let cases = [
            dmy.slice(0,dmy.indexOf(splitor[0])), //first case
            dmy.slice(dmy.indexOf(splitor[0])+1,dmy.lastIndexOf(splitor[1])), //middle case
            dmy.slice(dmy.lastIndexOf(splitor[1])+1,dmy.length) //last case
        ]
        splitor.push('');
        let dates = '';
        let i = 0;
        for(let c of cases){
            c = c.trim()
            console.log(c)
            if(this.length > 0 && this.length < 3){
                throw new Error("Invalid date format!")
            }else{
                let dmy = dOmOy(c);
                if(short && (c != 'y' && c!= 'yy')){
                    dmy = dmy.substring(0,3)
                }
                dates += dmy.concat(splitor[i++])
            }
        }
        // if(dates.length > 0) dates = dates.substring(0,dates.length -1)
        return dates;
        function dOmOy(c){
            let data = '';
            switch (c) {
                case 'd': { data = day() } break;
                case 'dd': { data = day(true) } break;
                case 'm': { data = month() } break;
                case 'mm': { data = month(true) } break;
                case 'y': { data = year() } break;
                case 'yy': { data = year(true) } break;
                default: { throw new Error("Invalid parsing date!") }
            }
            return data
        }
        function day(full = false){
            if(full){
                return DateUtils.day(date.getDay())
            }else{
                return NumUtils.padZero(date.getDay())
            }
        }
        function month(full = false){
            if(full){
                return DateUtils.month(date.getMonth())
            }else{
                return NumUtils.padZero(date.getMonth())
            }
        }
        function year(full = false){
            if(full){
                return date.getFullYear().toString()
            }else{
                return DateUtils.year(date.getFullYear().toString())
            }
        }
    },
    repeatCharacter: function(str){
        return str => new Set(str).size < str.length;
    },
    
    DateUtils: function(){
        
    }
}
const NumUtils = {
    padZero: function(num = 0){
        if(num < 10) return `0${num}` 
        else return num.toString()
    },
}
const DateUtils = {
    day: function(index = 0){
        const dayofweek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return dayofweek[index]
    },
    month: function (index = 0  ){
        const monthOfYear = ['January','February','March','April','May','June','July','August','September','October','November','December']
        return monthOfYear[index]
    },
    year: function(year = new Date().getFullYear().toString()){
        year = year.substring(year.length-2)
        return year
    }
}

console.log(itech().date().format('d,m yy'))