var SharedRulesIndexView = RuleIndexView.extend({

  Collection: SharedRulesCollection,

  className: 'shared-rules-index',

  getTemplate: function() {
    return RQ.Templates.SharedRulesIndex;
  },

  initialize: function(options) {
    this.rulesCollection = new this.Collection();
    this.options = options || {};

    this.listenTo(this.rulesCollection, 'loaded', this.render);
  },

  updateCollection: function(options) {
    this.rulesCollection.fetchRules(options.sharedListId);
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = this.options.sharedListId,
      index = $ruleItemRow.data('index');

    RQ.router.navigate('/sharedList/' + id + '/' + index, { trigger: true });
  },

  importRules: function() {
    var rules = this.rulesCollection.toJSON();

    _.each(rules, function(rule) {
      var ruleModel = new BaseRuleModel(rule);
      ruleModel.save();
    });

    RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.IMPORTED, 'Shared Rules ' + RQ.GA_EVENTS.ACTIONS.IMPORTED);
    Backbone.trigger('notification', {
      className: 'rq-success',
      message: 'Rules imported successfully!!'
    });
  }
});
