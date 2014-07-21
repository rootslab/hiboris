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
        , clone = Bolgia.clone
        // hiboris default opt
        , hiredis = null
        , hiboris_opt = {
            hiredis : false
            , return_buffers : false
        }
        , Hiboris = function ( opt ) {
            var me = this
                , cfg = null
                , hreader = null
                ;
            if ( ! ( me instanceof Hiboris ) ) {
                return new Hiboris( opt );
            }
            cfg = improve( clone( opt ), hiboris_opt );
            if ( ! cfg.hiredis ) return Boris();
            try {
                hiredis = require( 'hiredis' );
            } catch ( err ) {
                return Boris();
            }
            // NOTE: return buffers equal to true will slowdown -60%
            me.hreader = new hiredis.Reader( { return_buffers : cfg.return_buffers } );
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
            // NOTE: return buffers equal to true will slowdown -60%
            me.hreader = new hiredis.Reader( { return_buffers : cfg.return_buffers } );
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