'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VACANCY = function () {
    function VACANCY() {
        _classCallCheck(this, VACANCY);

        var _self = this;
        _self.doc = document;
        _self.window = window;
    }

    // Window load types (loading, dom, full)


    _createClass(VACANCY, [{
        key: 'appLoad',
        value: function appLoad(type, callback) {
            var _self = this;

            switch (type) {
                case 'loading':
                    if (_self.doc.readyState === 'loading') {
                        callback();
                    }

                    break;
                case 'dom':
                    _self.doc.onreadystatechange = function () {
                        if (_self.doc.readyState === 'complete') {
                            callback();
                        }
                    };

                    break;
                case 'full':
                    _self.window.onload = function (e) {
                        callback(e);
                    };

                    break;
                default:
                    callback();
            }
        }
    }, {
        key: 'experienceLogic',
        value: function experienceLogic() {
            $('.js-work-experience').change(function (e) {
                var $target = $(e.target);
                var $hiddenBlocks = $('.js-visible-no-experience');
                if ($target.is(':checked') && $target.data('value') === false) {
                    $hiddenBlocks.removeClass('fw-hidden');
                } else if ($target.is(':checked') && $target.data('value') === true) {
                    $hiddenBlocks.addClass('fw-hidden');
                }
            });
        }
    }]);

    return VACANCY;
}();