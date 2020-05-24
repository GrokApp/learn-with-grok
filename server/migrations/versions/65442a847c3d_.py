"""empty message

Revision ID: 65442a847c3d
Revises: 39bcd8ac4ea3
Create Date: 2020-05-24 14:18:07.427664

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65442a847c3d'
down_revision = '39bcd8ac4ea3'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('user_story_attempt', 'score', existing_type=sa.Integer(), type_=sa.Float())
    pass


def downgrade():
    op.alter_column('user_story_attempt', 'score', existing_type=sa.Float(), type_=sa.Integer())
    pass
