import { Response } from 'express';
import {
    ValidationError,
    NotFoundError,
    DBError,
    ConstraintViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError
} from 'objection';

export function errorHandler(err: any, res: Response) {
    if (err instanceof ValidationError) {
      switch (err.type) {
        case 'ModelValidation':
            res.status(400).send({
                message: err.message,
            });
          break;
        case 'RelationExpression':
            res.status(400).send({
                message: err.message
            });
          break;
        case 'UnallowedRelation':
            res.status(400).send({
                message: err.message
            });
          break;
        case 'InvalidGraph':
            res.status(400).send({
                message: err.message
            });
          break;
        default:
            res.status(400).send({
                message: err.message
            });
          break;
      }
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            message: err.message
        });
    } else if (err instanceof UniqueViolationError) {
        res.status(409).send({    
            message: err.message
        });
    } else if (err instanceof NotNullViolationError) {
        res.status(400).send({
            message: err.message
        });
    } else if (err instanceof ForeignKeyViolationError) {
        res.status(409).send({
            message: err.message
        });
    } else if (err instanceof CheckViolationError) {
        res.status(400).send({
            message: err.message
        });
    } else if (err instanceof DataError) {
        res.status(400).send({
            message: err.message
        });
    } else if (err instanceof DBError) {
        res.status(500).send({
            message: err.message
        });
    } else {
        res.status(500).send({
            message: err.message
        });
    }
}