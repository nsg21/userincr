// Adjustable Incrementer
// jQuery plugin
// (C) 2014 Andrew Nikitin
// MIT License
(function($){
  // options are passed through .data facility
  //   min -- minimum allowed value
  //   max -- maximum allowed value
  //   step -- increment/decrement
  //   op -- 'add' or 'mul', type of increment
  // TODO:
  //   deal with negative mul-type spins
  //
  $.fn.userincr=function(options) {
    options=$.extend({},$.fn.userincr.defaults,options ||{});
    return this.each(function(){
      var edit=$(this);
      var oldvalue=edit.val();
      var lastinc='b';
      edit
      .attr('title',edit.attr('title') || 'Enter "+x" or "+x%" or "*x" \nto change increment'+$.map(options.constants,function(v,i){return "\n"+i+"="+v}).join(''))
      .on('change',function(e){
        // console.log('change-handler-enter');
        var v=edit.val();
        if(undefined!==options.constants[v]) {
          edit.val(options.constants[v])
          // need limit_val() ??
          // need button focus?
        } else if( '%'==v.substr(-1) ) {
          v=parseFloat(v.substr(0,v.length-1))
          if(v>0) newdelta('mul',1+v/100,'i');
          else newdelta('mul',1/(1+v/100),'d');
        } else {
          var f=v.substr(0,1)
          v=parseFloat(v.substr(1))
          if( '-'===f && edit.data('min')>=0  ) {
            newdelta('add',v,'d');
          } else if( '+'==f ) {
            if( v<0 ) newdelta('add',-v,'d');
            else newdelta('add',v,'i');
          } else if( '*'==f ) {
            if( v>1 ) newdelta('mul', v,'i');
            else      newdelta('mul', 1/v,'d');
          } else if( '/'==f ) {
            if(v>1) newdelta('mul',v,'d');
            else    newdelta('mul',1/v,'i');
          } else {
            limit_val();
            // if latest spin was by button, refocus the button when
            // value is set manually under assumption that the adjustment 
            // spin will continue
            if('b'==lastinc) btn[1].focus();
          }
        }
        // console.log('change-handler-exit');
      })
      if(options.kbd) edit.on('keydown',function(e){
        var o
        if(38==e.keyCode) o='i';
        else if(40==e.keyCode) o='d';
        else return;
        spin(o,'k')
        e.preventDefault();
      })
      if(options.wheel) edit.on('wheel',function(e){
        // not sure what browser support of this is
        spin(e.originalEvent.wheelDeltaY<0?'d':'i','w');
        e.preventDefault();
      })
      var limit_val=function(){
        var t=edit.data('min')
        var x=parseFloat(edit.val())
        if( $.isNumeric(t) && x<t ) x=t;
        t=edit.data('max')
        if( $.isNumeric(t) && x>t ) x=t;
        oldvalue=x;
        edit.val(x)
      }
      var newdelta=function(newop,newdelta,spinop){
        edit
          .data('op',newop)
          .data('step',newdelta)
        ;
        ['dec','inc'].forEach(function(lbl,i){
          btn[i].attr({title:options.ops[edit.data('op')][lbl+'fmt'](edit.data('step'))});
        });
        if(spinop!==undefined) spin(spinop);
      }
      var spin=function(spinop,from) {
        //console.log('sop='+spinop+" from="+from)
        edit.val(options.ops[edit.data('op')][spinop](parseFloat(oldvalue),edit.data('step')));
        limit_val();
        lastinc=from||lastinc;
        if('b'==lastinc) btn[spinop==='d'?0:1].focus();
        // console.log('trigger-spin');
        edit.trigger('step');
      };

      var btn=$.map(['dec','inc'],function(id){
        return $("<input>",{type:"button",value:options.buttons[id],"class":'userincr-btn-'+id})
          .on('click',function(){spin(id.substr(0,1),'b')});
      });
      newdelta(edit.data('op')||'add',edit.data('step')||1)
      if( 1!=edit.parent().children().length ) edit.wrap('<span class="userincr-container">');
      edit.parent().append(btn);
    });
  };
  $.fn.userincr.defaults={
    buttons:{ dec:'▼',inc:'▲'}, //◁ ▷ ◀ ▶ ▽ △ ▼ ▲
    constants:{},
    ops:{
      add:{
        i:function(x,delta){return x+delta},
        incfmt:function(delta){return "+"+delta},
        d:function(x,delta){return x-delta},
        decfmt:function(delta){return "−"+delta}
      },
      mul:{
        i:function(x,delta){return x*delta},
        incfmt:function(delta){return "×"+delta},
        d:function(x,delta){return x/delta},
        decfmt:function(delta){return "÷"+delta}
      }
    }
  };
}(jQuery));

// See also:
// http://stonebk.github.io/jquery-arrow-increment/
// http://thaibault.github.io/jQuery-incrementer/
