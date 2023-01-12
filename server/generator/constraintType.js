export class ConstraintType {
	static get NEXT_TO() {
		return { name: 'NEXT_TO', ruleStr: 'is adjacent to' };
	}
	static get SAME_ROW() {
		return { name: 'SAME_ROW', ruleStr: 'is in the same row as' };
	}
	static get SAME_COL() {
		return { name: 'SAME_COL', ruleStr: 'is in the same column as' };
	}
	static get ORTHO_ADJ() {
		return { name: 'ORTHO_ADJ', ruleStr: 'is next to' };
	}
	static get DIAG_ADJ() {
		return { name: 'DIAG_ADJ', ruleStr: 'is diagonally adjacent to' };
	}
	static get TO_LEFT() {
		return { name: 'TO_LEFT', ruleStr: 'is to the left of' };
	}
	static get TO_RIGHT() {
		return { name: 'TO_RIGHT', ruleStr: 'is to the right of' };
	}
	static get ABOVE() {
		return { name: 'ABOVE', ruleStr: 'is above' };
	}
	static get BELOW() {
		return { name: 'BELOW', ruleStr: 'is below' };
	}
	static get CORNER() {
		return { name: 'CORNER', ruleStr: 'is in a corner' };
	}
}

export const ConstraintTypeList = [
	ConstraintType.NEXT_TO,
	ConstraintType.SAME_ROW,
	ConstraintType.SAME_COL,
	ConstraintType.ORTHO_ADJ,
	ConstraintType.DIAG_ADJ,
	ConstraintType.TO_LEFT,
	ConstraintType.TO_RIGHT,
	ConstraintType.ABOVE,
	ConstraintType.BELOW,
	ConstraintType.CORNER,
];
