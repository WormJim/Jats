import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { memo } from 'react';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    boxShadow: `0px 1px 3px 0px rgba(0,0,0,0.2), 
                0px 1px 1px 0px rgba(0,0,0,0.14), 
                0px 2px 1px -1px rgba(0,0,0,0.12)`,
    borderRadius: 3,
    width: '100%',
    maxWidth: 375,
    overflow: 'hidden',
  },
  small: {
    height: 100,
  },
  medium: {
    height: 205,
  },
  large: {
    height: 310,
  },
  full: {
    height: '100%',
  },
});

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hiddenOverFlow?: boolean;
  variant?: 'small' | 'medium' | 'large' | 'full';
}

const Card = ({ children, className, variant = 'full', hiddenOverFlow, ...props }: CardProps) => {
  const styles = useStyles();

  return (
    <div className={classNames(styles.root, variant && styles[variant], className)} {...props}>
      {children}
    </div>
  );
};

export default memo(Card);
