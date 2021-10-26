import { mount } from '@vue/test-utils';
import Notes from '@/views/Notes.vue';
import NotesItem from '@/components/NotesItem.vue';
import store from '@/store';

describe('Notes.vue', () => {
  it('checks form validation', async () => {
    const wrapper = mount(Notes, {
      global: {
        plugins: [store],
      },
    });
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.findAll('.invalid-feedback')).toHaveLength(3);
  });
  it('adds a new note', async () => {
    const wrapper = mount(Notes, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('input').setValue('This is my test note');
    await wrapper.find('textarea').setValue('Note description');
    await wrapper.find('select').setValue('success');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.findAllComponents(NotesItem)).toHaveLength(1);
  });
  it('has the correct note color', async () => {
    const wrapper = mount(Notes, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('input').setValue('This is my test note');
    await wrapper.find('textarea').setValue('Note description');
    await wrapper.find('select').setValue('success');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.findComponent(NotesItem).find('.card').classes()).toContain(
      'bg-success',
    );
  });
});
