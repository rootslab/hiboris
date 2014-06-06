/*
 * Hiboris, a utility module to load Hiredis native parser, or to fall back to Boris, a pure JS parser.
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Hiboris = ( function () {
    var log = console.log
        , emitter = require( 'events' ).EventEmitter
        , util = require( 'util' )
        , Bolgia = require( 'bolgia' )
        , Boris = require( 'boris' )
        , improve = Bolgia.improve
        , reveal = Bolgia.reveal
        // hiboris default opt
        , hiredis = null
        , hiboris_opt = {
            hiredis : !false
        }
        , Hiboris = function ( opt ) {
            var me = this
                , cfg = null
                , hreader = null
                ;
            if ( ! ( me instanceof Hiboris ) ) {
                return new Hiboris( opt );
            }
            cfg = improve( opt, hiboris_opt );
            if ( ! cfg.hiredis ) return Boris();
            try {
                hiredis = require( 'hiredis' );
            } catch ( err ) {
                return Boris();
            }
            me.hreader = new hiredis.Reader( { return_buffers : true } );
            me.options = cfg;
        }
        , hproto = null
        ;

    util.inherits( Hiboris, emitter );

    hproto = Hiboris.prototype;

    hproto.reset = function () {
        var me = this
            ;
        if ( hiredis ) {
            me.hreader = new hiredis.Reader( { return_buffers : true } );
        }
    };

    hproto.parse = function ( data ) {
        var me = this
            , hreader = me.hreader
            , hreply = null
            ;
        hreader.feed( data );
        while ( true ) {
            try {
                hreply = hreader.get();
             } catch ( err ) {
                me.emit( 'error', err );
                break;
            }
            if ( hreply === undefined ) {
                break;
            }
            me.emit( 'match', hreply.constructor === Error, hreply && hreply.length ? hreply : [ hreply ], reveal );
        };
    };

    return Hiboris;
} )();