class VACANCY {

    constructor() {
        const _self = this;
        _self.doc = document;
        _self.window = window;
    }

    // Window load types (loading, dom, full)
    appLoad(type, callback) {
        const _self = this;

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

    experienceLogic() {
        $('.js-work-experience').change((e) => {
            let $target = $(e.target);
            let $hiddenBlocks = $('.js-visible-no-experience');
            if($target.is(':checked') && $target.data('value') === false) {
                $hiddenBlocks.removeClass('fw-hidden');
            } else if ($target.is(':checked') && $target.data('value') === true) {
                $hiddenBlocks.addClass('fw-hidden');
            }
        });
    }
}
