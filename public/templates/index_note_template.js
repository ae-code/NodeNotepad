(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index_note'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<tr>\n	<td>&nbsp;</td>\n	<td colspan='4'>\n		<span>Title:   </span><input type='text' class='input-xxlarge' value='";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "' />\n		<textarea class='note_area'>";
  if (stack1 = helpers.note) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.note; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n		<br/>\n		<span>Created: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fullDateTime),stack1 ? stack1.call(depth0, depth0.creation_date, options) : helperMissing.call(depth0, "fullDateTime", depth0.creation_date, options)))
    + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Updated: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fullDateTime),stack1 ? stack1.call(depth0, depth0.update_date, options) : helperMissing.call(depth0, "fullDateTime", depth0.update_date, options)))
    + "</span><button class='btn note_edit'><i class='icon-edit'></i>  Save Note</button>\n	</td>\n	<td>&nbsp;</td>\n</tr>";
  return buffer;
  });
})();