import re
import os
import random
import string

from django.core.management.base import BaseCommand, CommandError
from django.core.files import File

from product.models import Product, Subcategory, Brand


IMAGE_EXTENSIONS = ('.jpg', '.png')
TITLES_LIST = (
    "Брюки жен.",
    "Комплект жен.",
    "Майка жен.",
    "Джемпер жен.",
)
PRICE_INTERVAL = (50, 200)


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--n', type=int)
        parser.add_argument('--path_images', type=str)

    def handle(self, *args, **options):
        path_images = options.get('path_images')
        if not os.path.exists(path_images):
            raise CommandError("Unknown image directory")

        count = options.get('n')
        if count <= 0 or count > 1000:
            raise CommandError("The number of items must be positive, but not higher than 1000")

        images = [f_ for f_ in os.listdir(path_images) if self.is_img_file(f_)]
        if not images:
            raise CommandError("Image directory is empty")

        data_images = self.remake_images_list(images)
        parent_dir = os.path.abspath(path_images)
        self.create_data_(data_images, count, parent_dir)

    @staticmethod
    def remake_images_list(images):
        pattern = re.compile(r'^(\d)_')
        result = {}
        for image in images:
            subcategory = pattern.findall(image.lower())

            if subcategory:
                subcategory = subcategory[0]
                if subcategory not in result.keys():
                    result[subcategory] = [image, ]
                    continue
                result[subcategory].append(image)

        return result

    @staticmethod
    def create_data_(data, count, parent_path):
        subcategories_keys = list(data.keys())
        subcategories = Subcategory.objects.all()
        if subcategories.filter(id__in=subcategories_keys).count() != len(subcategories_keys):
            raise CommandError("Subcategory not found")

        brands = Brand.objects.all()

        for item in range(count):
            subcategory = Subcategory.objects.get(
                id=int(random.choice(subcategories_keys)),
            )
            model = ''.join(random.choices(string.ascii_uppercase + string.digits, k=7))

            file_name = random.choice(data.get(str(subcategory.id)))
            file_path = os.path.join(parent_path, file_name)
            file_ = File(open(file_path, 'rb'))

            p = Product.objects.create(
                name=random.choice(TITLES_LIST),
                subcategory=subcategory,
                model=model,
                is_new=bool(random.getrandbits(1)),
                brand=random.choice(brands),
                price=random.randint(*PRICE_INTERVAL),
                image=File(file=open(file_path, 'rb'), name=file_name)
            )

    @staticmethod
    def is_img_file(path):
        _, ext = os.path.splitext(path)
        return ext.lower() in IMAGE_EXTENSIONS
