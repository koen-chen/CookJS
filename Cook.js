(function(){
	var each = function(obj, interator, context){
		if (obj.constructor === Object) { 
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (interator.call(context, obj[key], key, obj) === 'break') return;
				}
			}
		}
		if (obj.constructor === Array) {
			for (var i = 0; i < obj.length; i++) {
				if (interator.call(context, objp[key], key, obj) === 'break') return;
			}
		}
	};
	
	var pad = function(val){
		return val < 10 ? '0' + val : val;
	};

	var _slice = Array.prototype.slice;

	window.Cook = {
		Array : {
			every : function(arr, predicate, context){
				var result = true;
				if (arr === []) return result;
				each(arr, function(item, index, list){
					if (!predicate.call(context, item, index, list)) {
						result = false;
						return 'break';
					}
				});
				return result;
			},

			filter : function(arr, predicate, context){
				var resutl = [];
				each(arr, function(item, index, list){
					if (predicate.call(context, item, index, list)) {
						result.push(item);
					}
				})
				return result;
			},

			forEach : function(arr, fn, context){
				each(arr, fn, context);
			},

			indexOf : function(arr, item, start){
				for (var i = start || 0; i < arr.length; i++) {
					(arr[i] === item) && return i;
				}
				return -1;
			},

			lastIndexOf : function(arr, item, start){
				for (var i = start || arr.length -1; i >= 0; i--) {
					(arr[i] === item) && return i;
				}
				return -1;
			},

			map : function(arr, fn, context){
				var result = [];
				each(arr, function(item, index, list){
					result.push(fn.call(context, item, index, list));
				})
				return result;
			},

			reduce : function(arr, fn, inital){
				var temp = inital;
				each(arr, function(item, index, list){
					if (temp !== undefined) {
						temp = fn.call(null, temp, item, index, list);
					}
					else {
						temp = item;
					}
				});
				return temp;
			},

			reduceRight : function(arr, fn, inital){
				var reversed = _slice.call(arr).reverse();
				return this.reduce(reversed, fn, inital);
			},

			some : function(arr, predicate, context){
				var result = false;
				each(arr, function(item, index, list){
					if (predicate.call(context, item, index, list)) {
						result = true;
						return 'break';
					}
				})
				return result;
			}
		},
		String : {
			trim : function(str){
				return str.replace(/^\s*|\s*$/ig,'');
			}
		},
		Date : {
			now : function(){
				return +(new Date());
			},

			toISOString : function(date){
				return pad(date.getFullYear()) + '-' +
					   pad(date.getUTCMonth() + 1) + '-' +
					   pad(date.getUTCDate()) + 'T' +
					   pad(date.getUTCHours()) + ':' +
					   pad(date.getUTCMinutes()) + ':' +
					   ('000' + date.getUTCSeconds()).slice(-3) + 'Z';
			},

			toJSON : function(date){
				return Cook.Date.toISOString();
			}
		},
		Function : {
			bind : function(fn, context){
				var args = _slice.call(arguments,2);
				return (function(){
					return fn.apply(context,args.contact(_slice.call(arguments)));
				})
			}
		},
		Object : {
			getPrototypeOf : function(obj){
				return obj.construcotr.prototype;
			},

			keys : function(obj){
				var result = [];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						result.push(key);
					}
				} 
				return result;
			},

			create : function(){

			},

			defineProperty : function(){

			},

			defineProperties : function(){

			},

			freeze : function(){

			},

			getOwnPropertyDescriptor : function(){

			},

			getOwnPropertyNames : function(){

			},

			isExtensible : function(obj){

			},

			isFrozen : function(obj){

			},

			isSealed : function(){

			},

			preventExtensions : function(){

			},

			seal : function(){

			}
		}
	}
})(window)