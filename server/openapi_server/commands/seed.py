import click
from flask.cli import with_appcontext

@click.command("do_work")
@with_appcontext
def do_work():
    print("Hello, world")
