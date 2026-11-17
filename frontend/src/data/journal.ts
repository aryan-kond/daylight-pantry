import journal1 from '../assets/journal/journal-1.webp';
import journal2 from '../assets/journal/journal-2.webp';
import journal3 from '../assets/journal/journal-3.webp';
import journal4 from '../assets/journal/journal-4.webp';
import journal5 from '../assets/journal/journal-5.webp';
import journal6 from '../assets/journal/journal-6.webp';

export type Topic = 'Breakfast' | 'Snack ideas' | 'Easy recipes' | 'Pantry tips';

type ArticleList = {
  title: string;
  /** Numbered steps when true, bulleted items when false */
  ordered?: boolean;
  items: string[];
};

export type Article = {
  slug: string;
  title: string;
  topic: Topic;
  /** Reading time in minutes */
  minutes: number;
  /** One or two sentences shown on cards */
  teaser: string;
  image: string;
  imageAlt: string;
  intro: string[];
  lists: ArticleList[];
  tip: string;
};

// DEMO: all article text is made up. Replace it with real writing before launch.
// The first article is the featured one on the journal page.
export const ARTICLES: Article[] = [
  {
    slug: 'slow-morning-granola-bowl',
    title: 'The slow-morning granola bowl',
    topic: 'Breakfast',
    minutes: 4,
    teaser:
      'Crunchy granola, cool yogurt and a handful of fresh fruit: a breakfast that takes five minutes and still feels like a treat.',
    image: journal1,
    imageAlt:
      'A bowl of granola with yogurt, blueberries and strawberry slices and a spoon, on a sunlit wooden table',
    intro: [
      'Some mornings call for a proper sit-down breakfast, even when there is not much time. A granola bowl is the easiest way to get there: nothing to cook, and nothing to wash but a bowl and a spoon.',
      'The trick is contrast. Something crunchy, something creamy and something fresh, layered so that every spoonful has a little of each.',
    ],
    lists: [
      {
        title: 'What you need',
        items: [
          'A generous handful of granola',
          'A few spoonfuls of yogurt, any kind you like',
          'Fresh berries or sliced fruit',
          'A mint leaf or two, if you want it to look special',
        ],
      },
      {
        title: 'How to put it together',
        ordered: true,
        items: [
          'Spoon the yogurt into a wide bowl, spreading it up the sides a little.',
          'Add the granola in a pile, leaving some of the yogurt showing.',
          'Scatter the fruit over the top and finish with the mint.',
          'Eat right away, while the granola is still crunchy.',
        ],
      },
    ],
    tip: 'Add the granola last and eat soon after. If it sits in the yogurt for too long, it loses its crunch.',
  },
  {
    slug: 'snacks-to-keep-in-your-bag',
    title: 'Snacks to keep in your bag',
    topic: 'Snack ideas',
    minutes: 3,
    teaser:
      'A small jar, a bar and a napkin: three simple things that save you when the afternoon gets long.',
    image: journal2,
    imageAlt: 'A small glass jar of mixed nuts and seeds beside a seed bar on a linen cloth',
    intro: [
      'The best snack is the one you actually have with you. A small kit in your bag turns a long afternoon from a rushed decision into an easy one.',
      'Think small, dry and sturdy: things that survive a bumpy commute and do not need a fridge.',
    ],
    lists: [
      {
        title: 'A simple kit',
        items: [
          'A small jar of mixed nuts and seeds',
          'A seed or oat bar wrapped in a napkin',
          'A piece of fruit that travels well, such as an apple',
          'A cloth bag or tote to carry it all',
        ],
      },
      {
        title: 'Little habits that help',
        ordered: true,
        items: [
          'Refill the jar on Sunday evening so it is ready for the week.',
          'Keep one spare bar in a coat pocket for emergencies.',
          'Rinse and dry the jar after each use so it is ready next time.',
        ],
      },
    ],
    tip: 'Keep the jar small. A half-full jar you will finish beats a big one that goes stale.',
  },
  {
    slug: 'nut-butter-toast-three-ways',
    title: 'Nut butter toast, three ways',
    topic: 'Easy recipes',
    minutes: 5,
    teaser:
      'One slice of toast, one spoonful of nut butter and three very different toppings. Ready in the time it takes the kettle to boil.',
    image: journal3,
    imageAlt:
      'Three slices of toast on a wooden board topped with nut butter and banana, berries, and sliced almonds',
    intro: [
      'Toast with nut butter is one of the simplest breakfasts there is, and one of the easiest to change. A new topping turns the same slice into a different meal.',
      'Here are three combinations to try. Make one, or toast three slices and taste them side by side.',
    ],
    lists: [
      {
        title: 'What you need',
        items: [
          '3 slices of bread',
          'Nut butter of your choice',
          '1 small banana, sliced',
          'A handful of mixed berries',
          'A spoonful of sliced almonds',
        ],
      },
      {
        title: 'How to make them',
        ordered: true,
        items: [
          'Toast the bread until golden and crisp at the edges.',
          'Spread a thick layer of nut butter on each slice while it is still warm.',
          'Top the first slice with banana, the second with berries and the third with sliced almonds.',
          'Cut each slice in half if you want to share.',
        ],
      },
    ],
    tip: 'Spread the nut butter while the toast is warm so it softens and spreads evenly without tearing the bread.',
  },
  {
    slug: 'pantry-shelf-you-will-use',
    title: 'A pantry shelf you will actually use',
    topic: 'Pantry tips',
    minutes: 4,
    teaser:
      'Clear jars, a wooden scoop and one shelf at eye level: small changes that make a pantry easier to use every day.',
    image: journal4,
    imageAlt:
      'Glass jars of oats, almonds and seeds with a wooden scoop on a pale shelf in window light',
    intro: [
      'A good pantry does not need to be big or perfect. It needs to be easy to read at a glance, so you can see what you have and reach for it without thinking.',
      'A few small changes are usually enough. None of them takes more than an afternoon.',
    ],
    lists: [
      {
        title: 'Five small habits',
        ordered: true,
        items: [
          'Decant the things you use most into clear jars, so you can see what is running low.',
          'Keep everyday items at eye level and rarely used ones higher up.',
          'Leave a scoop with each jar so measuring takes seconds.',
          'Group like with like: breakfast things together, snacks together.',
          'Write the date on the lid whenever you refill a jar.',
        ],
      },
    ],
    tip: 'If you can see it, you will use it. Clear jars at eye level do more than any perfect label ever will.',
  },
  {
    slug: 'overnight-oats-in-a-jar',
    title: 'Overnight oats in a jar',
    topic: 'Breakfast',
    minutes: 5,
    teaser:
      'Stir it together tonight, open the fridge tomorrow. A grab-and-go breakfast that asks for five minutes and a jar.',
    image: journal5,
    imageAlt:
      'A glass jar of overnight oats topped with blackberries, blueberries and a strawberry slice on a wooden table',
    intro: [
      'Overnight oats are the breakfast for people who are not quite awake yet. You do the thinking the evening before, and in the morning there is nothing left to do but eat.',
      'The recipe is forgiving. Change the fruit, the milk or the toppings and it still works.',
    ],
    lists: [
      {
        title: 'What you need',
        items: [
          '½ cup rolled oats',
          '½ cup milk or plant milk',
          '2 tablespoons yogurt',
          'A pinch of cinnamon, if you like it',
          'Berries or sliced fruit to finish',
        ],
      },
      {
        title: 'How to make it',
        ordered: true,
        items: [
          'Stir the oats, milk, yogurt and cinnamon together in a jar.',
          'Put the lid on and leave it in the fridge overnight.',
          'In the morning, give it a stir and add a splash of milk if it is too thick.',
          'Top with fruit and eat straight from the jar.',
        ],
      },
    ],
    tip: 'Make two jars at once. The second one means tomorrow morning is already taken care of.',
  },
  {
    slug: 'homemade-granola-bars-one-tray',
    title: 'Homemade granola bars in one tray',
    topic: 'Easy recipes',
    minutes: 5,
    teaser:
      'Oats, nuts, a little nut butter and honey, pressed into one tray and cut into squares. Easy, and good for a week of snacks.',
    image: journal6,
    imageAlt:
      'Granola bars cut into squares on baking paper on a tray, with a sprig of mint and a linen cloth beside it',
    intro: [
      'Granola bars are easier to make than most people expect. Everything goes into one bowl, then into one tray, and the oven does the rest.',
      'Once you know the basic method, you can swap in whatever nuts, seeds or dried fruit you have in the pantry.',
    ],
    lists: [
      {
        title: 'What you need',
        items: [
          '2 cups rolled oats',
          '½ cup mixed nuts, roughly chopped',
          'A handful of seeds',
          '⅓ cup nut butter',
          '⅓ cup honey or syrup',
          'A handful of chocolate chips or dried fruit',
        ],
      },
      {
        title: 'How to make them',
        ordered: true,
        items: [
          'Heat the oven to 175°C (350°F) and line a small tray with baking paper.',
          'Mix the oats, nuts and seeds in a large bowl.',
          'Warm the nut butter and honey together until runny, then stir them into the dry mix with the chocolate or fruit.',
          'Press the mixture firmly into the tray and bake for about 20 minutes, until golden at the edges.',
          'Let it cool completely in the tray before cutting it into squares.',
        ],
      },
    ],
    tip: 'Press the mixture down firmly with the back of a spoon. It is what keeps the bars together when you cut them.',
  },
];

export function getArticle(slug: string | undefined): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
