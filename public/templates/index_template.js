(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n	<tr class='notes_row' row_id='";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "'>\n       	        <td><i class='icon-chevron-right'></i></td>\n		<td>";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n		<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.prettyDateTime),stack1 ? stack1.call(depth0, depth0.creation_date, options) : helperMissing.call(depth0, "prettyDateTime", depth0.creation_date, options)))
    + "</td>\n		<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.prettyDateTime),stack1 ? stack1.call(depth0, depth0.update_date, options) : helperMissing.call(depth0, "prettyDateTime", depth0.update_date, options)))
    + "</td>\n		<td>";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n	        <td><div class='note_remove'><i class='icon-remove' title='Delete Note''></i></div></td>\n	</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.notes, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
})();