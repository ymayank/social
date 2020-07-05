import React from 'react';
import { makeStyles, Typography, Card, CardActionArea, CardContent, CardMedia, Grid } from '@material-ui/core';
import { ACTIVE_HOST } from '../../network/Urls';

const useStyles = makeStyles({
  date: {
    marginBottom: 10,
    marginRight: 10,
    textAlign: 'end'
  },
});

export default function MediaCard({ item }) {
  const classes = useStyles();
  const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component={'iframe'}
            alt={item.fileName}
            height="140"
            src={`${ACTIVE_HOST}${item.url}`}
            title="card image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.fileName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
          </CardContent>
          <Typography className={classes.date} variant="textSecondary" component="p">
          {new Date(item.created).toLocaleDateString('en-IN', DATE_OPTIONS)}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
    
  );
}
