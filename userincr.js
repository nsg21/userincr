// Adjustable Incrementer
// jQuery plugin
// (C) 2014 Andrew Nikitin
// MIT License
(function($){
  // options are passed through .data facility
  //   min -- minimum allowed value
  //   max -- maximum allowed value
  // TODO:
  //   step -- increment/decrement
  //   op -- 'add' or 'mul', type of increment
  //   spinbuttons -- "<<,>>" if present, generate spin buttons
  // TODO:
  //   spin on keyboard and mouse wheel
  //
  $.fn.userincr=function(options) {
    options=$.extend({},$.fn.userincr.defaults,options ||{});
    // ??? optins is shared between all invocations of a function?
    return this.each(function(){
      var edit=$(this);
      var oldvalue=edit.val();
      edit
        .attr('title',edit.attr('title') || 'Enter "+x" or "+x%" or "*x" \nto change increment')
        .data('step',edit.data('step')||1)
        .data('op',edit.data('op')||'add')
      ;
      
      edit.on('change',function(e){
        // console.log('change-handler-enter');
        var v=edit.val();
        if(0) {
        } else if( '%'==v.substr(-1) ) {
          v=parseFloat(v.substr(0,v.length-1))
          if(v>0) newdelta('mul',1+v/100,'inc');
          else newdelta('mul',1/(1+v/100),'dec');
        } else if( '-'===v.substr(0,1) && edit.data('min')>=0  ) {
          newdelta('add',-parseFloat(v),'dec');
        } else if( '+'==v.substr(0,1) ) {
          v=parseFloat(v.substr(1));
          if( v<0 ) newdelta('add',-v,'dec');
          else newdelta('add',v,'inc');
        } else if( '*'==v.substr(0,1) ) {
          v=parseFloat(v.substr(1));
          if( v>1 ) newdelta('mul', v,'inc');
          else      newdelta('mul', 1/v,'dec');
        } else if( '/'==v.substr(0,1) ) {
          v=parseFloat(v.substr(1));
          if(v>1) newdelta('mul',v,'dec');
          else    newdelta('mul',1/v,'inc');
        } else {
          btn[1].focus();
        }
        limit_val();
        oldvalue=edit.val();
        // console.log('change-handler-exit');
      });
      var limit_val=function(){
        var t=edit.data('min')
        if( parseFloat(edit.val())<t ) edit.val(t);
        t=edit.data('max')
        if( parseFloat(edit.val())>t ) edit.val(t);
      }
      var newdelta=function(newop,newdelta,spinop){
        edit
          .data('op',newop)
          .data('step',newdelta)
        ;
        update_tooltip();
        spin(spinop);
      }
      var spin=function(spinop) {
        edit.val(OPS[edit.data('op')][spinop](parseFloat(oldvalue),edit.data('step')));
        limit_val();
        btn[spinop==='dec'?0:1].focus();
        oldvalue=edit.val();
        // console.log('trigger-spin');
        edit.trigger('spin');
      };

      var btn=$.map(['dec','inc'],function(id){
        return $("<input>",{type:"button",value:options.buttonlabels[id],"class":'userincr-btn-'+id})
          .on('click',function(){spin(id)});
      });
      var update_tooltip=function(){
        ['dec','inc'].forEach(function(lbl,i){
          btn[i].attr({title:OPS[edit.data('op')][lbl+'fmt'](edit.data('step'))});
        });
      };
      update_tooltip();
      if( 1!=edit.parent().children().length ) edit.wrap('<span class="userincr-container">');
      edit.parent().append(btn);
    });
  };
  var OPS={
    add:{
      inc:function(x,delta){return x+delta},
      incfmt:function(delta){return "+"+delta},
      dec:function(x,delta){return x-delta},
      decfmt:function(delta){return "−"+delta}
    },
    mul:{
      inc:function(x,delta){return x*delta},
      incfmt:function(delta){return "×"+delta},
      dec:function(x,delta){return x/delta},
      decfmt:function(delta){return "÷"+delta}
    }
  };
  $.fn.userincr.defaults={
    buttonlabels:{ dec:'▼',inc:'▲'} //◁ ▷ ◀ ▶ ▽ △ ▼ ▲
  };
}(jQuery));

// See also:
// http://stonebk.github.io/jquery-arrow-increment/
// http://thaibault.github.io/jQuery-incrementer/#home
