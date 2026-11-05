/**
 * All learning content. Offline, hardcoded, English, non-graphic wording.
 */

export type TopicTone = 'critical' | 'calm';

export type LessonStep = {
  heading: string;
  body: string;
  warning?: string;
};

export type Topic = {
  id: string;
  title: string;
  group: string;
  icon: string;
  tone: TopicTone;
  minutes: number;
  steps: LessonStep[];
};

export type OrderScenario = {
  id: string;
  topicId: string;
  mode: 'order';
  text: string;
  /** Canonical correct sequence, index 0 first. */
  steps: string[];
  reason: string;
};

export type ChooseScenario = {
  id: string;
  topicId: string;
  mode: 'choose';
  text: string;
  options: string[];
  correct: number;
  reason: string;
};

export type Scenario = OrderScenario | ChooseScenario;

export const TOPIC_GROUPS = [
  'BREATHING AND CHOKING',
  'BLEEDING AND WOUNDS',
  'HEAT, COLD AND FAINTING',
];

export const TOPICS: Topic[] = [
  {
    id: 'choking-adult',
    title: 'Choking (adult)',
    group: 'BREATHING AND CHOKING',
    icon: 'wind',
    tone: 'critical',
    minutes: 2,
    steps: [
      {
        heading: 'Ask and look',
        body: 'Ask the person if they are choking. If they can cough loudly or speak, let them keep coughing and stay with them.',
      },
      {
        heading: 'Call for help',
        body: 'If the cough becomes silent or weak, ask someone to call local emergency services while you stay with the person.',
        warning: 'Do not leave a silent, struggling person alone if another helper can make the call.',
      },
      {
        heading: 'Five back blows',
        body: 'Lean the person forward and give up to five firm blows between the shoulder blades with the heel of your hand.',
      },
      {
        heading: 'Five abdominal thrusts',
        body: 'If the blockage stays, give up to five inward and upward abdominal thrusts, then alternate blows and thrusts.',
        warning: 'Anyone who received thrusts should be checked by a medical professional afterwards.',
      },
    ],
  },
  {
    id: 'choking-child',
    title: 'Choking (child)',
    group: 'BREATHING AND CHOKING',
    icon: 'baby',
    tone: 'critical',
    minutes: 2,
    steps: [
      {
        heading: 'Stay calm and look',
        body: 'Keep the child calm. A child who is coughing strongly is still moving air, so encourage the cough.',
      },
      {
        heading: 'Call for help early',
        body: 'If the cough weakens, have someone call local emergency services straight away and put the phone on speaker.',
      },
      {
        heading: 'Gentle back blows',
        body: 'Support the child leaning forward and give up to five back blows between the shoulder blades, scaled to their size.',
        warning: 'Use far less force than you would use for an adult.',
      },
      {
        heading: 'Keep alternating',
        body: 'Alternate five back blows with five gentle thrusts appropriate to the age, until help takes over.',
      },
    ],
  },
  {
    id: 'unresponsive',
    title: 'Unresponsive and not breathing',
    group: 'BREATHING AND CHOKING',
    icon: 'heartPulse',
    tone: 'critical',
    minutes: 3,
    steps: [
      {
        heading: 'Check the scene',
        body: 'Make sure the area is safe for you before you approach. You cannot help anyone if you are hurt too.',
      },
      {
        heading: 'Check response and breathing',
        body: 'Tap the shoulders and speak loudly. Open the airway and look for normal breathing for no more than ten seconds.',
      },
      {
        heading: 'Call and ask for a defibrillator',
        body: 'Call local emergency services on speaker and ask a bystander to bring the nearest defibrillator.',
        warning: 'Occasional gasping is not normal breathing. Treat it as not breathing.',
      },
      {
        heading: 'Start compressions',
        body: 'Place both hands in the centre of the chest and push hard and fast at about 100 to 120 per minute until help takes over.',
      },
    ],
  },
  {
    id: 'bleeding',
    title: 'Severe bleeding',
    group: 'BLEEDING AND WOUNDS',
    icon: 'droplet',
    tone: 'critical',
    minutes: 2,
    steps: [
      {
        heading: 'Protect yourself',
        body: 'Put on gloves or use a clean barrier between your hands and the wound whenever one is available.',
      },
      {
        heading: 'Press firmly',
        body: 'Press directly on the wound with a clean pad and keep the pressure steady without lifting to check.',
      },
      {
        heading: 'Call for help',
        body: 'Call local emergency services while you keep pressing, or ask a bystander to call for you.',
        warning: 'If the pad soaks through, add another on top instead of removing the first.',
      },
      {
        heading: 'Keep them warm and still',
        body: 'Help the person lie down, keep them warm and keep talking to them until help arrives.',
      },
    ],
  },
  {
    id: 'nosebleed',
    title: 'Nosebleed',
    group: 'BLEEDING AND WOUNDS',
    icon: 'droplet',
    tone: 'calm',
    minutes: 2,
    steps: [
      {
        heading: 'Sit and lean forward',
        body: 'Have the person sit upright and lean slightly forward so nothing runs down the back of the throat.',
      },
      {
        heading: 'Pinch the soft part',
        body: 'Pinch the soft part of the nose just below the bony bridge and hold without releasing.',
      },
      {
        heading: 'Hold for ten minutes',
        body: 'Keep pinching for a full ten minutes, breathing through the mouth. Releasing early restarts the clock.',
        warning: 'Do not tip the head back. That sends fluid into the throat and can cause coughing.',
      },
      {
        heading: 'Review and rest',
        body: 'Afterwards avoid blowing the nose or bending down for several hours. Seek care if it lasts beyond twenty minutes.',
      },
    ],
  },
  {
    id: 'sprains',
    title: 'Sprains and strains',
    group: 'BLEEDING AND WOUNDS',
    icon: 'bone',
    tone: 'calm',
    minutes: 2,
    steps: [
      {
        heading: 'Rest the limb',
        body: 'Stop the activity and support the injured joint in the position that feels most comfortable.',
      },
      {
        heading: 'Cool it',
        body: 'Apply a cold pack wrapped in a cloth for up to twenty minutes to limit swelling.',
        warning: 'Never place ice directly against the skin.',
      },
      {
        heading: 'Support gently',
        body: 'Use a soft bandage for light support, snug but never tight enough to change skin colour or cause tingling.',
      },
      {
        heading: 'Raise and review',
        body: 'Raise the limb when resting. Seek medical care if weight bearing is impossible or the shape looks wrong.',
      },
    ],
  },
  {
    id: 'burns',
    title: 'Burns and scalds',
    group: 'HEAT, COLD AND FAINTING',
    icon: 'flame',
    tone: 'critical',
    minutes: 2,
    steps: [
      {
        heading: 'Stop the burning',
        body: 'Move the person away from the heat source and remove clothing or jewellery near the area unless it is stuck.',
      },
      {
        heading: 'Cool with running water',
        body: 'Cool the area under cool running water for twenty minutes. Water is the only thing that belongs on a fresh burn.',
        warning: 'No ice, no butter, no creams and no toothpaste on a burn.',
      },
      {
        heading: 'Keep the person warm',
        body: 'Cool the burn but keep the rest of the body warm with a blanket, especially for children.',
      },
      {
        heading: 'Cover loosely',
        body: 'Cover with cling film laid flat or a clean non fluffy cloth, then seek medical advice for anything larger than a palm.',
      },
    ],
  },
  {
    id: 'fainting',
    title: 'Fainting',
    group: 'HEAT, COLD AND FAINTING',
    icon: 'activity',
    tone: 'calm',
    minutes: 2,
    steps: [
      {
        heading: 'Catch the warning signs',
        body: 'Pale skin, sweating and a feeling of lightness often come first. Help the person sit or lie down immediately.',
      },
      {
        heading: 'Raise the legs',
        body: 'With the person on their back, raise the legs above heart level to help blood return to the head.',
      },
      {
        heading: 'Loosen and ventilate',
        body: 'Loosen tight clothing at the neck and let fresh air reach them. Most people recover within a minute.',
        warning: 'If they do not wake within a minute, treat it as unresponsive and call for help.',
      },
      {
        heading: 'Recover slowly',
        body: 'Let them sit up slowly, then stand only when steady. Offer water once they are fully alert.',
      },
    ],
  },
  {
    id: 'heat',
    title: 'Heat exhaustion',
    group: 'HEAT, COLD AND FAINTING',
    icon: 'thermometer',
    tone: 'calm',
    minutes: 2,
    steps: [
      {
        heading: 'Move to a cool place',
        body: 'Get the person out of the sun into shade or an air conditioned room straight away.',
      },
      {
        heading: 'Lie down and raise the legs',
        body: 'Have them lie down and raise the legs slightly while you loosen tight clothing.',
      },
      {
        heading: 'Cool and rehydrate',
        body: 'Cool the skin with damp cloths or a fan, and give small sips of water if they are fully alert.',
        warning: 'Confusion, hot dry skin or collapse means a medical emergency. Call for help at once.',
      },
      {
        heading: 'Watch for thirty minutes',
        body: 'Stay with them and keep watching. Seek care if they do not improve within thirty minutes.',
      },
    ],
  },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'sc-burn-1',
    topicId: 'burns',
    mode: 'order',
    text: 'A guest at a barbecue spills boiling water on their forearm. The skin is red and painful.',
    steps: [
      'Move them away from the heat source',
      'Cool the forearm under running water',
      'Keep the rest of the body warm',
      'Cover loosely with clean cling film',
    ],
    reason: 'Cool the burn before covering it, or the dressing traps the heat against the skin.',
  },
  {
    id: 'sc-burn-2',
    topicId: 'burns',
    mode: 'choose',
    text: 'You have cooled a small kitchen burn for twenty minutes. A friend offers an ice pack and a tub of cream.',
    options: [
      'Press the ice pack straight onto the burn',
      'Cover the burn loosely with clean cling film',
      'Rub the cream in and wrap it tightly',
    ],
    correct: 1,
    reason: 'Ice damages cooled skin and creams trap heat. A loose clean cover protects without pressure.',
  },
  {
    id: 'sc-choke-1',
    topicId: 'choking-adult',
    mode: 'order',
    text: 'At a restaurant a diner suddenly grips their throat. Their cough quickly becomes silent.',
    steps: [
      'Ask them if they are choking',
      'Ask a bystander to call emergency services',
      'Give up to five firm back blows',
      'Give up to five abdominal thrusts',
    ],
    reason: 'Confirm first, get help coming, then clear the airway. Back blows come before thrusts.',
  },
  {
    id: 'sc-choke-2',
    topicId: 'choking-adult',
    mode: 'choose',
    text: 'A colleague is coughing loudly and forcefully after a sip of coffee. They can still say a few words.',
    options: [
      'Start back blows immediately',
      'Encourage them to keep coughing and stay close',
      'Offer a large glass of water to wash it down',
    ],
    correct: 1,
    reason: 'A strong cough moves more air than any technique you can apply. Stay ready, do not interrupt it.',
  },
  {
    id: 'sc-bleed-1',
    topicId: 'bleeding',
    mode: 'order',
    text: 'A neighbour cuts their hand on a broken glass and the wound is losing a lot of blood.',
    steps: [
      'Put on gloves or use a clean barrier',
      'Press firmly on the wound with a clean pad',
      'Call local emergency services',
      'Help them lie down and keep them warm',
    ],
    reason: 'Protect yourself, stop the loss, then get help coming and prevent shock.',
  },
  {
    id: 'sc-bleed-2',
    topicId: 'bleeding',
    mode: 'choose',
    text: 'You have been pressing on a wound for two minutes and the pad has soaked through.',
    options: [
      'Remove the pad and check the wound',
      'Add a second pad on top and keep pressing',
      'Release the pressure for a short rest',
    ],
    correct: 1,
    reason: 'Lifting the pad breaks the clot that is forming. Build up layers and keep the pressure unbroken.',
  },
  {
    id: 'sc-nose-1',
    topicId: 'nosebleed',
    mode: 'order',
    text: 'A teenager gets a nosebleed during a warm afternoon class.',
    steps: [
      'Sit them upright and lean slightly forward',
      'Pinch the soft part of the nose',
      'Hold the pinch for ten full minutes',
      'Avoid nose blowing for a few hours',
    ],
    reason: 'Leaning forward keeps the throat clear, and an unbroken ten minute pinch lets the clot form.',
  },
  {
    id: 'sc-faint-1',
    topicId: 'fainting',
    mode: 'order',
    text: 'Someone standing in a long queue goes pale and says the room feels light.',
    steps: [
      'Help them sit or lie down at once',
      'Raise their legs above heart level',
      'Loosen tight clothing and allow fresh air',
      'Let them sit up slowly once alert',
    ],
    reason: 'Getting them down prevents a fall, and raised legs return blood to the brain fastest.',
  },
  {
    id: 'sc-faint-2',
    topicId: 'fainting',
    mode: 'choose',
    text: 'A person who fainted has not woken up after a full minute on the floor.',
    options: [
      'Keep waiting quietly for a few more minutes',
      'Sit them up and offer a sweet drink',
      'Treat as unresponsive and call emergency services',
    ],
    correct: 2,
    reason: 'A faint resolves in under a minute. Anything longer is treated as unresponsive from that moment.',
  },
  {
    id: 'sc-heat-1',
    topicId: 'heat',
    mode: 'order',
    text: 'A runner finishes in strong sun looking flushed, sweating heavily and feeling sick.',
    steps: [
      'Move them into shade or a cool room',
      'Lie them down and raise the legs slightly',
      'Cool the skin and give small sips of water',
      'Keep watching them for thirty minutes',
    ],
    reason: 'Remove the heat first, then help circulation, then rehydrate slowly while you monitor.',
  },
  {
    id: 'sc-sprain-1',
    topicId: 'sprains',
    mode: 'order',
    text: 'A player turns an ankle on uneven ground. It is swelling but they can still move the foot.',
    steps: [
      'Stop the activity and rest the ankle',
      'Apply a wrapped cold pack',
      'Add gentle bandage support',
      'Raise the limb while resting',
    ],
    reason: 'Rest, cool, support and raise. In that order swelling has the least chance to build.',
  },
  {
    id: 'sc-unresp-1',
    topicId: 'unresponsive',
    mode: 'choose',
    text: 'An adult collapses in front of you. They do not respond and you see only occasional gasps.',
    options: [
      'Wait to see whether the gasping settles',
      'Call emergency services and start chest compressions',
      'Give them water to help them come round',
    ],
    correct: 1,
    reason: 'Occasional gasping is not normal breathing. Call for help and begin compressions without delay.',
  },
];

export type Guide = {
  id: string;
  title: string;
  icon: string;
  lines: string[];
};

export const GUIDES: Guide[] = [
  {
    id: 'g-burn',
    title: 'Burns',
    icon: 'flame',
    lines: [
      'Move away from the heat source.',
      'Cool under running water for twenty minutes.',
      'Remove loose jewellery near the area.',
      'Cover loosely with clean cling film.',
      'Seek care for anything larger than a palm.',
    ],
  },
  {
    id: 'g-choke',
    title: 'Choking',
    icon: 'wind',
    lines: [
      'Ask whether they are choking.',
      'A loud cough means keep coughing.',
      'A silent cough means act now.',
      'Five back blows, then five thrusts.',
      'Call emergency services early.',
    ],
  },
  {
    id: 'g-bleed',
    title: 'Bleeding',
    icon: 'droplet',
    lines: [
      'Use gloves or a clean barrier.',
      'Press firmly and do not lift the pad.',
      'Add pads on top if they soak through.',
      'Call emergency services while pressing.',
      'Keep the person warm and lying down.',
    ],
  },
  {
    id: 'g-cpr',
    title: 'Compressions',
    icon: 'heartPulse',
    lines: [
      'Check the scene is safe.',
      'Check response and normal breathing.',
      'Call for help and a defibrillator.',
      'Push hard in the centre of the chest.',
      'Aim for 100 to 120 per minute.',
    ],
  },
  {
    id: 'g-faint',
    title: 'Fainting',
    icon: 'activity',
    lines: [
      'Help them lie down early.',
      'Raise the legs above heart level.',
      'Loosen tight clothing.',
      'Allow fresh air around them.',
      'If not awake in a minute, call for help.',
    ],
  },
  {
    id: 'g-heat',
    title: 'Heat',
    icon: 'thermometer',
    lines: [
      'Move into shade or a cool room.',
      'Lie down with legs slightly raised.',
      'Cool the skin with damp cloths.',
      'Small sips of water if fully alert.',
      'Confusion means call for help.',
    ],
  },
  {
    id: 'g-nose',
    title: 'Nosebleed',
    icon: 'droplet',
    lines: [
      'Sit upright, lean slightly forward.',
      'Pinch the soft part of the nose.',
      'Hold for ten unbroken minutes.',
      'Never tip the head back.',
      'Seek care beyond twenty minutes.',
    ],
  },
  {
    id: 'g-sprain',
    title: 'Sprains',
    icon: 'bone',
    lines: [
      'Rest and support the joint.',
      'Cold pack wrapped in cloth.',
      'Twenty minutes maximum per round.',
      'Bandage snug, never tight.',
      'Raise the limb when resting.',
    ],
  },
  {
    id: 'g-call',
    title: 'Calling help',
    icon: 'info',
    lines: [
      'Say where you are first.',
      'Say what happened, briefly.',
      'Say how many people are hurt.',
      'Put the phone on speaker.',
      'Do not hang up until told to.',
    ],
  },
];

export type KitItem = { id: string; label: string; qty: string };

export const KIT_ITEMS: KitItem[] = [
  { id: 'k1', label: 'Sterile adhesive dressings', qty: '20' },
  { id: 'k2', label: 'Sterile gauze pads', qty: '10' },
  { id: 'k3', label: 'Conforming bandage', qty: '2' },
  { id: 'k4', label: 'Triangular bandage', qty: '2' },
  { id: 'k5', label: 'Disposable gloves', qty: '6 pairs' },
  { id: 'k6', label: 'Cleansing wipes', qty: '10' },
  { id: 'k7', label: 'Adhesive tape', qty: '1 roll' },
  { id: 'k8', label: 'Blunt nosed scissors', qty: '1' },
  { id: 'k9', label: 'Tweezers', qty: '1' },
  { id: 'k10', label: 'Foil blanket', qty: '2' },
  { id: 'k11', label: 'Cold pack', qty: '2' },
  { id: 'k12', label: 'Emergency numbers card', qty: '1' },
];

export function topicById(id: string): Topic {
  const found = TOPICS.find(t => t.id === id);
  return found ? found : TOPICS[0];
}

export function topicTitle(id: string): string {
  return topicById(id).title;
}

/** Short uppercase labels for the thin stat strip. */
const TOPIC_SHORT: { [key: string]: string } = {
  'choking-adult': 'CHOKING',
  'choking-child': 'CHILD',
  unresponsive: 'RESCUE',
  bleeding: 'BLEEDING',
  nosebleed: 'NOSE',
  sprains: 'SPRAINS',
  burns: 'BURNS',
  fainting: 'FAINTING',
  heat: 'HEAT',
};

export function topicShort(id: string): string {
  const found = TOPIC_SHORT[id];
  return found ? found : 'FIRST AID';
}
