// tslint:disable:no-console
import { Request, Response, response } from "express";
import Game from "../models/game";

export const addReview = (req: Request, res: Response) => {
    console.log("add Review");
    console.log(req.body);
    Game.findOneAndUpdate(
        { _id: req.body.gameId },
        {
            $push: {
                reviews: req.body
            }
        },
        (err: any, book: any) => {
            console.log(book);
            if (err) {
              res.send(err);
            } else {
              res.send("Succesfully inserted review!");
            }
          }
      );
  };

export const updateReview = (req: Request, res: Response) => {
    console.log("update review");
    Game.findOneAndUpdate(
        {   "_id": req.body.gameId,
            "reviews._id": req.params.id
        },
        {
            $set: {
                "reviews.$.body": req.body.body,
                "reviews.$.date": req.body.date,
                "reviews.$.gameId": req.body.gameId,
                "reviews.$.rating": req.body.rating,
                "reviews.$.title": req.body.title
            }
        },
        (err: any, book: any) => {
            console.log(book);
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              res.send("Succesfully inserted review!");
            }
          }
    );
};

export const getAllReviews = (req: Request, res: Response) => {
    console.log("get all reviews");
    Game.find({
        reviews : {
            $exists: true,
        },
    }, (err: any, result: any) => {
        if (err) {
            res.send(err);
        } else {
            // tslint:disable-next-line:prefer-const
            let reviews: any[] = [];
            // tslint:disable-next-line:variable-name
            result.forEach((_g: any) => {
                // tslint:disable-next-line:variable-name
                _g.reviews.forEach((_review: any) => {
                    reviews.push(_review);
                });
            });
            res.send(reviews);
        }
    });
};
