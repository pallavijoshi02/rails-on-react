import _ from 'underscore';

const MenuConf = {
  dashboard: {
    path: 'dashboard',
    text: 'dashboard',
    icon: 'fa fa-home',
  },
  user: {
    path: '',
    text: 'user',
    icon: 'fa fa-user',
    items: [{
      path: 'user_groups',
      text: 'user group'
    }, {
      path: 'users',
      text: 'users'
    }]
  }
};

class MenuObj {
  static build(conf, parent) {
    const out = new MenuObj()
    out.init(conf, parent)
    return out
  }

  init = (conf, parent) => {
    this._conf = conf
    this._lvl = (!!parent ? parent.level + 1 : 0)
    this._prefix = (!!parent ? parent.pathPrefix : '') + '/' + conf.path
    if (!!conf.items) {
      this._items = _.map(conf.items, (item) => (MenuObj.build(item, this)))
      this._full = this._items[0].fullPath
    } else {
      this._items = []
      this._full = this._prefix
    }
  }

  get conf() { return this._conf }
  get level() { return this._lvl }
  get key() { return this._conf.path }
  get text() { return this._conf.text }
  get icon() { return this._conf.icon }
  get pathPrefix() { return this._prefix }
  get fullPath() { return this._full }
  get children() { return this._items || [] }
}

const MenuObjects = {
  dashboard: MenuObj.build(MenuConf.dashboard),
  user: MenuObj.build(MenuConf.user),
}

export default MenuObjects;
