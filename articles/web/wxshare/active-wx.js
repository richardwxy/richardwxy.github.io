// check for selected crop region
// update info by cropping (onChange and onSelect events handler)
function updateInfo(e) {
    setPreview(e);
    $('#x1').val(e.x);
    $('#y1').val(e.y);
    $('#x2').val(e.x2);
    $('#y2').val(e.y2);
    $('#w').val(e.w);
    $('#h').val(e.h);
}

function setPreview(e) {
    window.SUBMIT_DATA = e;
    console.log(e);
    var width = this.screen.width;
    var rate = 8 / 9;
    $('.J_preview').css({
        width: width,
        height: width / rate
    });
    if (window.CORP_TYPE == 'height') {
        var scale = (width / rate) / e.h;
        $('#preview-upload-img').css({
            height: width / rate,
            left: -(e.x * scale),
            top: 0
        })
    } else {
        var scale = width / e.w
        $('#preview-upload-img').css({
            width: width,
            left: 0,
            top: -(e.y * scale)
        })
    }
}

// clear info by cropping (onRelease event handler)
function clearInfo(e) {
    $('.info #w').val('');
    $('.info #h').val('');
}


function cropImage(image, width, height) {
    // preview element
    $('#preview').remove();
    $('.J_viewContent').append('<img id="preview">');
    var oImage = $('#preview')[0];

    oImage.src = image;
    oImage.onload = function () {

        /*if (oImage.naturalWidth < 800 || oImage.naturalHeight < 900) {
         SP.dialog.tip('请选择宽大于800,高大于900的图片');
         return;
         }*/
        $('.J_uploadContent').hide();
        $('.J_viewContent').show();
        $('.J_main').hide();
        $('.J_preview').hide()

        // display some basic image info
        $('#filedim').val(oImage.naturalWidth + ' x ' + oImage.naturalHeight);

        // Create variables (in this scope) to hold the Jcrop API and image size
        var jcrop_api, boundx, boundy;

        // destroy Jcrop if it is existed

        if (typeof window.JCROP_API != 'undefined')
            window.JCROP_API.destroy();

        if (typeof jcrop_api != 'undefined')
            jcrop_api.destroy();

        var img = $('#preview')[0];
        $('#preview-upload-img').attr('src', img.src);
        var boxWidth = window.screen.width;
        var boxHeight = Math.floor(window.screen.width / (img.naturalWidth / img.naturalHeight));
        var selectWidth;
        var selectHeight;
        var aspectRatio = 8 / 9;
        //alert([boxWidth,boxHeight,img.naturalWidth,img.naturalHeight]);
        if (boxWidth / boxHeight > 8 / 9) {
            window.CORP_TYPE = 'height';
            selectHeight = boxHeight;
            selectWidth = Math.floor(boxHeight * aspectRatio);
        } else {
            window.CORP_TYPE = 'width';
            selectWidth = boxWidth;
            selectHeight = Math.floor(boxWidth / aspectRatio);
        }

        //console.log(boxWidth,boxHeight,selectWidth,selectHeight)

        // initialize Jcrop
        $('#preview').Jcrop({
            //boxWidth: boxWidth,
            //boxHeight: boxHeight,
            minSize: [selectWidth, selectHeight], // min crop size
            maxSize: [selectWidth, selectHeight], // min crop size
            setSelect: [0, 0, selectWidth, selectHeight],
            aspectRatio: aspectRatio, // keep aspect ratio 1:1
            bgFade: true, // use fade effect
            bgOpacity: .3, // fade opacity
            allowSelect: false,
            onChange: updateInfo,
            onSelect: updateInfo,
            onRelease: clearInfo
        }, function () {

            // use the Jcrop API to get the real image size
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];

            console.log(bounds);

            // Store the Jcrop API in the jcrop_api variable
            window.JCROP_API = jcrop_api = this;
        });
    };
}

var events = {
    '.J_closePop|click': function () {
        $(this).parent().parent().hide();
    },
    '.J_change|click': function () {
        var imgs = $('.J_imgs img');
        var index = imgs.index($('.J_imgs .on')[0]);
        if (index === imgs.length - 1) {
            index = 0;
        } else {
            index++
        }
        $($('.J_imgs img')[index]).addClass('on').siblings().removeClass('on');
    },
    '.J_goto|click': function () {
        $(this).parent().hide();
        $('.J_preview').show();
        $('.J_main').show();
    },
    '.J_submit|click': function () {
        submit();
    }
};

function submit() {
    //var fd = new FormData();
    var img = $('#preview')[0];
    if(!img.src){
        return SP.dialog.tip('请先选择图片，并且截图')
    }
    var width = img.naturalWidth;
    var height = img.naturalHeight;
    if (window.CORP_TYPE == 'height') {
        var scale = height / SUBMIT_DATA.h;
    } else {
        var scale = width / SUBMIT_DATA.w;
    }
    //fd.append('file', img);
    var w = Math.floor(scale * SUBMIT_DATA.w)
    var h = Math.floor(scale * SUBMIT_DATA.h)
    var x = Math.floor(scale * SUBMIT_DATA.x)
    var y = Math.floor(scale * SUBMIT_DATA.y)
    var desc1 = $("#desc1").val();
    var desc2 = $('#desc2').val();
    var manager = $('#manager').val();
    $("#maskLayer").show();


    $.ajax({
        type: 'POST',
        url: CONFIG.URL,
        data: {
            desc1:desc1,
            desc2:desc2,
            manager:manager,
            x:x,
            y:y,
            w:w,
            h:h,
            img: img.src
        },
        success: function(data){
            $("#maskLayer").hide();
            if(data.code == 0){
                WeixinJSBridge.invoke('imagePreview', {
                    'current' : data.pic,  //这是当前的预览的图片，多图的时候请大家自由发挥，可结合jquery来做
                    'urls' : [data.pic]   //urls相当于一个图片数组，多图的时候请大家自由发挥，可结合jquery来做
                });
            }else{
                SP.dialog.tip(data.msg,5000);
            }
        },
        dataType: 'json'
    });
}

var CONFIG = {
    URL: '/index.php?g=Wap&m=Huodong&a=save'
};

SP.events.init(events);



/*
 *一下代码为select样式所用
 *需配合cs-select 与 cs-select-elastic css 文件一并使用
*/


/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }
    else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else {
        // browser global
        window.classie = classie;
    }

})( window );

/**
 * selectFx.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {

    'use strict';

    /**
     * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
     */
    function hasParent( e, p ) {
        if (!e) return false;
        var el = e.target||e.srcElement||e||false;
        while (el && el != p) {
            el = el.parentNode||false;
        }
        return (el!==false);
    };

    /**
     * extend obj function
     */
    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * SelectFx function
     */
    function SelectFx( el, options ) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );
        this._init();
    }

    /**
     * SelectFx options
     */
    SelectFx.prototype.options = {
        // if true all the links will open in a new tab.
        // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
        newTab : true,
        // when opening the select element, the default placeholder (if any) is shown
        stickyPlaceholder : true,
        // callback when changing the value
        onChange : function( val ) { return false; }
    }

    /**
     * init function
     * initialize and cache some vars
     */
    SelectFx.prototype._init = function() {
        // check if we are using a placeholder for the native select box
        // we assume the placeholder is disabled and selected by default
        var selectedOpt = this.el.querySelector( 'option[selected]' );
        this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

        // get selected option (either the first option with attr selected or just the first option)
        this.selectedOpt = selectedOpt || this.el.querySelector( 'option' );

        // create structure
        this._createSelectEl();

        // all options
        this.selOpts = [].slice.call( this.selEl.querySelectorAll( 'li[data-option]' ) );

        // total options
        this.selOptsCount = this.selOpts.length;

        // current index
        this.current = this.selOpts.indexOf( this.selEl.querySelector( 'li.cs-selected' ) ) || -1;

        // placeholder elem
        this.selPlaceholder = this.selEl.querySelector( 'span.cs-placeholder' );

        // init events
        this._initEvents();
    }

    /**
     * creates the structure for the select element
     */
    SelectFx.prototype._createSelectEl = function() {
        var self = this, options = '', createOptionHTML = function(el) {
            var optclass = '', classes = '', link = '';

            if( el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder ) {
                classes += 'cs-selected ';
                this.foundSelected = true;
            }
            // extra classes
            if( el.getAttribute( 'data-class' ) ) {
                classes += el.getAttribute( 'data-class' );
            }
            // link options
            if( el.getAttribute( 'data-link' ) ) {
                link = 'data-link=' + el.getAttribute( 'data-link' );
            }

            if( classes !== '' ) {
                optclass = 'class="' + classes + '" ';
            }

            return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
        };

        [].slice.call( this.el.children ).forEach( function(el) {
            if( el.disabled ) { return; }

            var tag = el.tagName.toLowerCase();

            if( tag === 'option' ) {
                options += createOptionHTML(el);
            }
            else if( tag === 'optgroup' ) {
                options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
                [].slice.call( el.children ).forEach( function(opt) {
                    options += createOptionHTML(opt);
                } )
                options += '</ul></li>';
            }
        } );

        var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
        this.selEl = document.createElement( 'div' );
        this.selEl.className = this.el.className;
        this.selEl.tabIndex = this.el.tabIndex;
        this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
        this.el.parentNode.appendChild( this.selEl );
        this.selEl.appendChild( this.el );
    }

    /**
     * initialize the events
     */
    SelectFx.prototype._initEvents = function() {
        var self = this;

        // open/close select
        this.selPlaceholder.addEventListener( 'click', function() {
            self._toggleSelect();
        } );

        // clicking the options
        this.selOpts.forEach( function(opt, idx) {
            opt.addEventListener( 'click', function() {
                self.current = idx;
                self._changeOption();
                // close select elem
                self._toggleSelect();
            } );
        } );

        // close the select element if the target it´s not the select element or one of its descendants..
        document.addEventListener( 'click', function(ev) {
            var target = ev.target;
            if( self._isOpen() && target !== self.selEl && !hasParent( target, self.selEl ) ) {
                self._toggleSelect();
            }
        } );

        // keyboard navigation events
        this.selEl.addEventListener( 'keydown', function( ev ) {
            var keyCode = ev.keyCode || ev.which;

            switch (keyCode) {
                // up key
                case 38:
                    ev.preventDefault();
                    self._navigateOpts('prev');
                    break;
                // down key
                case 40:
                    ev.preventDefault();
                    self._navigateOpts('next');
                    break;
                // space key
                case 32:
                    ev.preventDefault();
                    if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
                        self._changeOption();
                    }
                    self._toggleSelect();
                    break;
                // enter key
                case 13:
                    ev.preventDefault();
                    if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
                        self._changeOption();
                        self._toggleSelect();
                    }
                    break;
                // esc key
                case 27:
                    ev.preventDefault();
                    if( self._isOpen() ) {
                        self._toggleSelect();
                    }
                    break;
            }
        } );
    }

    /**
     * navigate with up/dpwn keys
     */
    SelectFx.prototype._navigateOpts = function(dir) {
        if( !this._isOpen() ) {
            this._toggleSelect();
        }

        var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;

        if( dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1 ) {
            // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
            this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
            // remove focus class if any..
            this._removeFocus();
            // add class focus - track which option we are navigating
            classie.add( this.selOpts[this.preSelCurrent], 'cs-focus' );
        }
    }

    /**
     * open/close select
     * when opened show the default placeholder if any
     */
    SelectFx.prototype._toggleSelect = function() {
        // remove focus class if any..
        this._removeFocus();

        if( this._isOpen() ) {
            if( this.current !== -1 ) {
                // update placeholder text
                this.selPlaceholder.textContent = this.selOpts[ this.current ].textContent;
            }
            classie.remove( this.selEl, 'cs-active' );
        }
        else {
            if( this.hasDefaultPlaceholder && this.options.stickyPlaceholder ) {
                // everytime we open we wanna see the default placeholder text
                this.selPlaceholder.textContent = this.selectedOpt.textContent;
            }
            classie.add( this.selEl, 'cs-active' );
        }
    }

    /**
     * change option - the new value is set
     */
    SelectFx.prototype._changeOption = function() {
        // if pre selected current (if we navigate with the keyboard)...
        if( typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ) {
            this.current = this.preSelCurrent;
            this.preSelCurrent = -1;
        }

        // current option
        var opt = this.selOpts[ this.current ];

        // update current selected value
        this.selPlaceholder.textContent = opt.textContent;

        // change native select element´s value
        this.el.value = opt.getAttribute( 'data-value' );

        // remove class cs-selected from old selected option and add it to current selected option
        var oldOpt = this.selEl.querySelector( 'li.cs-selected' );
        if( oldOpt ) {
            classie.remove( oldOpt, 'cs-selected' );
        }
        classie.add( opt, 'cs-selected' );

        // if there´s a link defined
        if( opt.getAttribute( 'data-link' ) ) {
            // open in new tab?
            if( this.options.newTab ) {
                window.open( opt.getAttribute( 'data-link' ), '_blank' );
            }
            else {
                window.location = opt.getAttribute( 'data-link' );
            }
        }

        // callback
        this.options.onChange( this.el.value );
    }

    /**
     * returns true if select element is opened
     */
    SelectFx.prototype._isOpen = function(opt) {
        return classie.has( this.selEl, 'cs-active' );
    }

    /**
     * removes the focus class from the option
     */
    SelectFx.prototype._removeFocus = function(opt) {
        var focusEl = this.selEl.querySelector( 'li.cs-focus' )
        if( focusEl ) {
            classie.remove( focusEl, 'cs-focus' );
        }
    }

    /**
     * add to global namespace
     */
    window.SelectFx = SelectFx;

} )( window );


/*
 *一上代码为select样式所用
 *需配合cs-select 与 cs-select-elastic css 文件一并使用
 */