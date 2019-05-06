import React from 'react';
import {
  Collapse, List,
  ListItem, ListItemText,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import MenuObjects from '../helper/menuConf';

const Item = (props) => {
  const {item, expanded, showRoot, ...rest} = props
  const hasChildren = item.children.length > 0
  const icon = item.icon || (hasChildren && 'fa fa-list-ul')
  let padding = 16 * (item.level + (showRoot ? 1 : 0))
  return (
    <ListItem {...rest} button
      component={NavLink} to={item.pathPrefix} exact
      style={{ paddingLeft: padding + (!!icon ? 0 : 20) }}>
      {!!icon && <i className={`${icon} fa-fw icon`} />}
      <ListItemText primary={item.text} color='inherit' />
      {hasChildren && (expanded ? <ExpandLess className='arr close' /> : <ExpandMore className='arr open'/>)}
    </ListItem>
  )
}

const MenuNode = withRouter((props) => {
  const {role, showRoot, parentActive,
    location, match, history,
    ...rest} = props
  const item = props.item || MenuObjects[role || '']
  if (!item) return null
  const hasChildren = item.children.length > 0
  const expand = hasChildren && location.pathname.startsWith(item.pathPrefix)
  return (<React.Fragment>
    {(item.level > 0 || showRoot) && <Item item={item} expanded={expand} showRoot={showRoot}
      className={expand || (!!parentActive && (item.level > 1 || showRoot)) ? 'part-active' : ''} />}
    {hasChildren && <Collapse in={expand}>
      <List component='nav' disablePadding className='drawer'>
        {item.children.map((x) => (<MenuNode key={x.key} item={x} showRoot={showRoot} parentActive={!!parentActive || expand} />))}
        </List>
      </Collapse>}
  </React.Fragment>)
})

export default MenuNode;
