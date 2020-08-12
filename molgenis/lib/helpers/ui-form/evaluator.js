import moment from 'moment'


export default function(script, entity) {
    function attribute(value) {
        var attribute = {
            age: function() {
                if (_isNull(this.val)) {
                    this.val = undefined
                    return this
                }

                const dateValue = typeof this.val === 'string' ? moment(this.val, 'YYYY-MM-DD', true) : moment(this.val)
                this.val = dateValue !== null && dateValue.isValid() ? Math.floor((Date.now() - dateValue.toDate()) / (365.2425 * 24 * 60 * 60 * 1000)) : undefined
                return this
            },
            and: function(other) {
                this.val = (this.val && other.value())
                return this
            },

            div: function(denominator) {
                if ((typeof denominator === 'object') && (typeof denominator.value === 'function')) {
                    denominator = denominator.value()
                }
                this.val = (this.val / denominator)
                return this
            },
            eq: function(other) {
                if (_isNull(this.val) && _isNull(other)) {
                    this.val = false
                } else if (_isNull(this.val) && !_isNull(other)) {
                    this.val = false
                } else {
                    this.val = (this.val === other)
                }
                return this
            },
            ge: function(value) {
                this.val = _isNull(this.val) ? false : (this.val >= value)
                return this
            },
            group: function(arrayOfBounds, arrayOfOutliers, nullValue) {
                // Check if the the value is an outlier value
                if (arrayOfOutliers && arrayOfOutliers.length > 0) {
                    for (var i = 0; i < arrayOfOutliers.length; i++) {
                        if (this.val === arrayOfOutliers[i]) {
                            return this
                        }
                    }
                }
                // find the ranges that the value fits into
                if (arrayOfBounds && arrayOfBounds.length > 0) {
                    var originalValue = this.val
                    if (originalValue < arrayOfBounds[0]) {
                        this.val = '-' + arrayOfBounds[0]
                    } else if (originalValue >= arrayOfBounds[arrayOfBounds.length - 1]) {
                        this.val = arrayOfBounds[arrayOfBounds.length - 1] + '+'
                    }
                    if (arrayOfBounds.length > 1) {
                        for (var j = 1; i < arrayOfBounds.length; i++) {
                            var lowerBound = arrayOfBounds[j - 1]
                            var upperBound = arrayOfBounds[j]
                            // If lowerBound is bigger than upperBound, restore the original value and stop the function
                            if (lowerBound > upperBound) {
                                this.val = nullValue
                                break
                            }
                            if (originalValue >= lowerBound && originalValue < upperBound) {
                                this.val = lowerBound + '-' + upperBound
                                break
                            }
                        }
                    }
                    return this
                }

                this.val = nullValue
                return this
            },
            gt: function(value) {
                this.val = _isNull(this.val) ? false : (this.val > value)
                return this
            },
            isNull: function() {
                this.val = _isNull(this.val)
                return this
            },
            isValidJson: function() {
                try {
                    JSON.parse(this.val)
                    this.val = true
                } catch (e) {
                    this.val = false
                }
                return this
            },
            le: function(value) {
                this.val = _isNull(this.val) ? false : (this.val <= value)
                return this
            },

            lt: function(value) {
                this.val = _isNull(this.val) ? false : (this.val < value)
                return this
            },
            map: function(categoryMapping, defaultValue, nullValue) {
                if (this.val in categoryMapping) {
                    this.val = categoryMapping[this.val]
                } else {
                    if (nullValue !== undefined && ((this.val === undefined) || (this.val === null))) {
                        this.val = nullValue
                    } else {
                        this.val = defaultValue
                    }
                }
                return this
            },
            matches: function(regex) {
                this.val = regex.test(this.val)
                return this
            },

            not: function() {
                this.val = !this.val
                return this
            },
            or: function(other) {
                this.val = (this.val || other.value())
                return this
            },
            plus: function(value) {
                if (!_isNull(value)) {
                    if (typeof value === 'object' || typeof value === 'function') {
                        this.val = this.val + value.value()
                    } else {
                        this.val = this.val + value
                    }
                }
                return this
            },
            pow: function(exp) {
                this.val = Math.pow(this.val, exp)
                return this
            },
            times: function(factor) {
                if ((typeof factor === 'object') && (typeof factor.value === 'function')) {
                    factor = factor.value()
                }
                this.val = (this.val * factor)
                return this
            },
            value: function() {
                return this.val
            },
        }

        function _isNull(value) {
            if (value === null || value === undefined) {
                return true
            }
            return (typeof value === 'string') && (value.length == 0)
        }

        attribute.val = value
        return attribute
    }

    function $(attr) {
        return new attribute(this[attr])
    }

    /* eslint-disable */
    $ = $.bind(entity)

    return eval(script)
}
